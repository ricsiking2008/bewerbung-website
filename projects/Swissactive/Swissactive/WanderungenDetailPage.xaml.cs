using System.Xml;

namespace Swissactive;

public partial class WanderungDetailPage : ContentPage
{
    private Wanderung _w;

    public WanderungDetailPage(Wanderung w)
    {
        InitializeComponent();
        _w = w;
        DetailImage.Source = w.Bild;
        NameLabel.Text = w.Name;
        KantonLabel.Text = w.Kanton;
    }

    private void OnFavoriteClicked(object sender, EventArgs e)
    {
        string favs = Preferences.Get("AllFavorites", "");
        if (!favs.Contains(_w.Name))
        {
            favs = string.IsNullOrEmpty(favs) ? _w.Name : favs + ";" + _w.Name;
            Preferences.Set("AllFavorites", favs);
            DisplayAlert("Erfolg", $"{_w.Name} wurde zu deinen Favoriten hinzugefügt!", "Super");
        }
        else
        {
            DisplayAlert("Info", "Diese Wanderung ist bereits gespeichert.", "OK");
        }
    }
}