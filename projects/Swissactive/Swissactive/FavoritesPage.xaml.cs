using System.Collections.ObjectModel;

namespace Swissactive;

public partial class FavoritesPage : ContentPage
{
    public ObservableCollection<string> Favs { get; set; }

    public FavoritesPage()
    {
        InitializeComponent();
        // Initialisierung von Favs, damit sie nicht null sind
        var savedData = Preferences.Get("AllFavorites", "");
        var list = savedData.Split(';', StringSplitOptions.RemoveEmptyEntries).ToList();
        Favs = new ObservableCollection<string>(list);
        FavList.ItemsSource = Favs;
    }

    private void OnDeleteClicked(object sender, EventArgs e)
    {
        if (sender is Button b && b.CommandParameter is string s)
        {
            Favs.Remove(s);
            Preferences.Set("AllFavorites", string.Join(";", Favs));
        }
    }
}