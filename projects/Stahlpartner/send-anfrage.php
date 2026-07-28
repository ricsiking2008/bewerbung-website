<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firma = strip_tags(trim($_POST["firma"] ?? ""));
    $name = strip_tags(trim($_POST["name"] ?? ""));
    $email = filter_var(trim($_POST["email"] ?? ""), FILTER_SANITIZE_EMAIL);
    $telefon = strip_tags(trim($_POST["telefon"] ?? ""));
    $beschreibung = trim($_POST["beschreibung"] ?? "");

    $recipient = "info@stahlpartner.ch";
    $email_subject = "Fertigungsanfrage Stahlpartner.ch";
    $allowed_extensions = ["pdf", "jpg", "jpeg", "png", "dxf", "dwg", "step", "stp", "zip"];
    $max_file_size = 15 * 1024 * 1024;

    if ($name === "" || $email === "" || $beschreibung === "") {
        echo "<h1>Bitte Name, E-Mail und Beschreibung ausfüllen.</h1>";
        echo "<a href='anfrage.html'>Zurück zur Anfrage</a>";
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<h1>Bitte eine gültige E-Mail-Adresse eingeben.</h1>";
        echo "<a href='anfrage.html'>Zurück zur Anfrage</a>";
        exit;
    }

    $email_content = "Fertigungsanfrage Stahlpartner.ch\n\n";
    $email_content .= "Firma: " . ($firma !== "" ? $firma : "-") . "\n";
    $email_content .= "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Telefon: " . ($telefon !== "" ? $telefon : "-") . "\n\n";
    $email_content .= "Beschreibung:\n$beschreibung\n";

    $has_attachment = isset($_FILES["datei"]) && $_FILES["datei"]["error"] !== UPLOAD_ERR_NO_FILE;

    $email_headers = "From: $name <$email>\r\n";
    $email_headers .= "Reply-To: $name <$email>\r\n";

    if ($has_attachment) {
        if ($_FILES["datei"]["error"] !== UPLOAD_ERR_OK) {
            echo "<h1>Die Datei konnte nicht hochgeladen werden.</h1>";
            echo "<a href='anfrage.html'>Zurück zur Anfrage</a>";
            exit;
        }

        if ($_FILES["datei"]["size"] > $max_file_size) {
            echo "<h1>Die Datei ist grösser als 15 MB.</h1>";
            echo "<a href='anfrage.html'>Zurück zur Anfrage</a>";
            exit;
        }

        $filename = basename($_FILES["datei"]["name"]);
        $extension = strtolower(pathinfo($filename, PATHINFO_EXTENSION));

        if (!in_array($extension, $allowed_extensions, true)) {
            echo "<h1>Dieser Dateityp ist nicht erlaubt.</h1>";
            echo "<p>Erlaubt sind PDF, JPG, PNG, DXF, DWG, STEP, STP und ZIP.</p>";
            echo "<a href='anfrage.html'>Zurück zur Anfrage</a>";
            exit;
        }

        $boundary = "mp_" . md5((string)time());
        $email_headers .= "MIME-Version: 1.0\r\n";
        $email_headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

        $email_body = "--$boundary\r\n";
        $email_body .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $email_body .= "Content-Transfer-Encoding: 8bit\r\n\r\n";
        $email_body .= $email_content . "\r\n";

        $file_content = chunk_split(base64_encode(file_get_contents($_FILES["datei"]["tmp_name"])));
        $file_type = mime_content_type($_FILES["datei"]["tmp_name"]) ?: "application/octet-stream";

        $email_body .= "--$boundary\r\n";
        $email_body .= "Content-Type: $file_type; name=\"$filename\"\r\n";
        $email_body .= "Content-Transfer-Encoding: base64\r\n";
        $email_body .= "Content-Disposition: attachment; filename=\"$filename\"\r\n\r\n";
        $email_body .= $file_content . "\r\n";
        $email_body .= "--$boundary--";
    } else {
        $email_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
        $email_body = $email_content;
    }

    if (mail($recipient, $email_subject, $email_body, $email_headers)) {
        echo "<h1>Vielen Dank! Ihre Anfrage wurde gesendet.</h1>";
        echo "<a href='index.html'>Zurück zur Website</a>";
    } else {
        echo "<h1>Hoppla! Etwas ist schiefgelaufen.</h1>";
        echo "<p>Bitte schreiben Sie direkt an info@stahlpartner.ch.</p>";
        echo "<a href='anfrage.html'>Zurück zur Anfrage</a>";
    }
} else {
    header("Location: anfrage.html");
    exit;
}
?>
