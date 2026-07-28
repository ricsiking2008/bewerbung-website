namespace Swissactive
{
    public partial class App : Application
    {
        public App()
        {
            InitializeComponent();
        }

        protected override Window CreateWindow(IActivationState? activationState)
        {
            // Wir erstellen hier direkt die NavigationPage mit der MainPage drin
            var navPage = new NavigationPage(new MainPage());
            return new Window(navPage);
        }
    }
}