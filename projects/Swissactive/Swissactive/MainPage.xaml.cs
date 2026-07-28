namespace Swissactive;

public partial class MainPage : ContentPage
{
    public MainPage() { InitializeComponent(); }

    private async void OnWanderungenClicked(object sender, EventArgs e) => await Navigation.PushAsync(new WanderungenPage());
    private async void OnLoginClicked(object sender, EventArgs e) => await Navigation.PushAsync(new LoginPage());
    private async void OnFavoritesClicked(object sender, EventArgs e) => await Navigation.PushAsync(new FavoritesPage());
}