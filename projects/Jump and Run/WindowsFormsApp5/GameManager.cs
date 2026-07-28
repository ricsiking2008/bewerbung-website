using System;
using System.Drawing;
using System.Windows.Forms;

namespace WindowsFormsApp5
{
    public class GameManager 
    {
        public bool IsGameOver { get; private set; } = false;
        public int ObstacleSpeed { get; set; } = 10;
        public int HighScore { get; private set; } = 0;
        public Random Rand { get; } = new Random();

        //konstruktor erstellen

        public void ResetGame(Form1 form, Player player)
        {
            IsGameOver = false;
            player.IsJumping = false;
            player.IsKeyDown = false;
            player.Score = 0;
            player.Force = 12;
            player.JumpSpeed = 0;
            player.Sprite.Top = form.Floor.Top - player.Sprite.Height;
            player.Sprite.Left = 50;

            form.BackColor = Color.Aqua;

            form.TxtScore.Text = "Score: " + player.Score;
            form.LblHighScore.Text = "Highscore: " + HighScore;

            foreach (Control x in form.Controls)
            {
                if (x is PictureBox && x.Tag != null)
                {
                    if (x.Tag.ToString() == "obstacle")
                    {
                        x.Left = form.ClientSize.Width + Rand.Next(200, 800);
                        x.Visible = true;
                    }
                    else if (x.Tag.ToString() == "coin")
                    {
                        x.Left = form.ClientSize.Width + Rand.Next(300, 800);
                        x.Top = form.Floor.Top - x.Height - Rand.Next(30, 100);
                        x.Visible = true;
                    }
                }
            }

            form.GameTimer.Start();
        }

        public void EndGame(Form1 form)
        {
            IsGameOver = true;
            form.GameTimer.Stop();
            form.BackColor = Color.Red;

            
            if (form.PlayerScore > HighScore)
            {
                HighScore = form.PlayerScore;
            }

            form.TxtScore.Text += "  Press R to Restart";
            form.LblHighScore.Text = "Highscore: " + HighScore;

            ObstacleSpeed = 10;
        }

    }
}
