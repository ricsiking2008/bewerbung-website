namespace Swissactive;

public partial class LoginPage : ContentPage
{
    public LoginPage()
    {
        // Diese Methode verbindet XAML mit C#. 
        // Wenn sie rot bleibt, hilft meist ein "Rebuild".
        InitializeComponent();
    }

    private async void OnLoginSubmitClicked(object sender, EventArgs e)
    {
        // Validierung für die Punkte im Raster
        if (string.IsNullOrWhiteSpace(EmailEntry?.Text) || string.IsNullOrWhiteSpace(PasswortEntry?.Text))
        {
            await DisplayAlert("Eingabe fehlt", "Bitte fülle beide Felder aus.", "OK");
            return;
        }

        await DisplayAlert("Erfolg", "Du bist jetzt angemeldet!", "OK");
        await Navigation.PopAsync();
    }

    private async void OnCancelClicked(object sender, EventArgs e)
    {
        await Navigation.PopAsync();
    }
}