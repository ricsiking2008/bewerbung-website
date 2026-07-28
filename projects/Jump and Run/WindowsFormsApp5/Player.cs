using System.Windows.Forms;

namespace WindowsFormsApp5
{
    public class Player
    {
        public PictureBox Sprite { get; private set; }
        public bool IsJumping { get; set; }
        public int JumpSpeed { get; set; }
        public int Force { get; set; } = 12;
        public int Score { get; set; } = 0;
        public bool IsKeyDown { get; set; }

        public Player(PictureBox sprite)
        {
            Sprite = sprite;
        }

        public void ApplyGravity(int floorY)
        {
            if (Sprite.Top + Sprite.Height >= floorY)
            {
                Sprite.Top = floorY - Sprite.Height;
                IsJumping = false;
                Force = 12;
            }
        }
    }
}
