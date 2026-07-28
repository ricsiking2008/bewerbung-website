using System.Collections.ObjectModel;

namespace Swissactive;

public partial class WanderungenPage : ContentPage
{
    public ObservableCollection<Wanderung> AlleWanderungen { get; set; }

    public WanderungenPage()
    {
        InitializeComponent();
        AlleWanderungen = new ObservableCollection<Wanderung>
        {
            new Wanderung { Name = "Oeschinensee", Kanton = "Bern", Bild = "mountain.jpg" },
            new Wanderung { Name = "Zermatt Trail", Kanton = "Wallis", Bild = "mountain.jpg" },
            new Wanderung { Name = "Creux du Van", Kanton = "Neuenburg", Bild = "mountain.jpg" }
        };
        WanderungenList.ItemsSource = AlleWanderungen;
    }

    private void OnSearchTextChanged(object sender, TextChangedEventArgs e)
    {
        var filtered = AlleWanderungen.Where(w => w.Name!.ToLower().Contains(e.NewTextValue.ToLower())).ToList();
        WanderungenList.ItemsSource = filtered;
    }

    private async void OnDetailsClicked(object sender, EventArgs e)
    {
        if (sender is Button b && b.BindingContext is Wanderung w)
            await Navigation.PushAsync(new WanderungDetailPage(w));
    }
}

public class Wanderung
{
    public string? Name { get; set; }
    public string? Kanton { get; set; }
    public string? Bild { get; set; }
}