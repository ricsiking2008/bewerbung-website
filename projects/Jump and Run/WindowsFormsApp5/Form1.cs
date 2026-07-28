using System;
using System.Drawing;
using System.Windows.Forms;

namespace WindowsFormsApp5
{
    public partial class Form1 : Form
    {
        public Timer GameTimer => gameTimer;
        public Label TxtScore => lblScore;
        public PictureBox Floor => floor;
        public Label LblHighScore => lblHighScore;
        public int PlayerScore => player.Score;

        private Player player;
        private GameManager gameManager;

        public Form1()
        {
            InitializeComponent();

            this.FormClosed += Form1_FormClosed;

            player = new Player(Running);
            gameManager = new GameManager();

            gameTimer.Interval = 12;
            gameManager.ResetGame(this, player);
        }

        private void Form1_FormClosed(object sender, FormClosedEventArgs e)
        {
            Application.Exit();
        }

        private void MainGameTimerEvent(object sender, EventArgs e)
        {
            HandleJump();
            MovePlayer();

            bool isOnObstacle = false;

            foreach (Control ctrl in Controls)
            {
                if (ctrl is PictureBox pb && pb.Tag != null)
                {
                    switch (pb.Tag.ToString())
                    {
                        case "obstacle":
                            MoveObstacle(pb);
                            if (CheckPlayerObstacleCollision(pb, ref isOnObstacle))
                                AdjustPlayerPosition(pb);
                            break;

                        case "coin":
                            MoveCoin(pb);
                            break;
                    }
                }
            }

            ApplyGravity(isOnObstacle);
            CheckPlayerBounds();
        }

        private void HandleJump()
        {
            if (player.IsJumping)
            {
                if (player.Force > 0)
                {
                    player.JumpSpeed = -12;
                    player.Force--;
                }
                else
                {
                    player.JumpSpeed = 10;
                }
            }
            else
            {
                player.JumpSpeed = 10;
            }
        }

        private void MovePlayer()
        {
            player.Sprite.Top += player.JumpSpeed;
            player.ApplyGravity(floor.Top);
        }

        private void MoveObstacle(PictureBox obstacle)
        {
            obstacle.Left -= gameManager.ObstacleSpeed;

            if (obstacle.Right < 5)
                obstacle.Left = ClientSize.Width + gameManager.Rand.Next(200, 800);
        }

        private bool CheckPlayerObstacleCollision(PictureBox obstacle, ref bool isOnObstacle)
        {
            if (player.Sprite.Bounds.IntersectsWith(obstacle.Bounds))
            {
                isOnObstacle = true;
                return true;
            }
            return false;
        }

        private void AdjustPlayerPosition(PictureBox obstacle)
        {
            var playerRect = player.Sprite.Bounds;
            var obstacleRect = obstacle.Bounds;

            if (playerRect.Bottom >= obstacleRect.Top && playerRect.Top < obstacleRect.Top && player.JumpSpeed >= 0)
            {
             
                player.Sprite.Top = obstacleRect.Top - player.Sprite.Height;
                player.IsJumping = false;
                player.Force = 12;
            }
            else if (playerRect.Right > obstacleRect.Left && playerRect.Left < obstacleRect.Left)
            {
          
                player.Sprite.Left = obstacleRect.Left - player.Sprite.Width;
            }
            else if (playerRect.Left < obstacleRect.Right && playerRect.Right > obstacleRect.Right)
            {
              
                player.Sprite.Left = obstacleRect.Right;
            }
            else if (playerRect.Top < obstacleRect.Bottom && playerRect.Bottom > obstacleRect.Bottom)
            {
                
                player.JumpSpeed = 10;
            }
        }

        private void MoveCoin(PictureBox coin)
        {
            coin.Left -= gameManager.ObstacleSpeed;

            if (coin.Right < 0 || player.Sprite.Bounds.IntersectsWith(coin.Bounds))
            {
                if (player.Sprite.Bounds.IntersectsWith(coin.Bounds) && coin.Visible)
                {
                    player.Score++;
                    lblScore.Text = "Score: " + player.Score;

                    if (player.Score % 5 == 0)
                    {
                        gameManager.ObstacleSpeed += 1;
                    }
                }

                coin.Left = ClientSize.Width + gameManager.Rand.Next(300, 800);
                coin.Top = floor.Top - coin.Height - gameManager.Rand.Next(30, 100);
                coin.Visible = true;
            }
        }

        private void ApplyGravity(bool isOnObstacle)
        {
            if (!player.IsJumping && !isOnObstacle)
                player.JumpSpeed = 10;
            else if (isOnObstacle)
                player.JumpSpeed = 0;
        }

        private void CheckPlayerBounds()
        {
            if (player.Sprite.Left > ClientSize.Width || player.Sprite.Right < 0)
                gameManager.EndGame(this);
        }

        private void keyisdown(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Space && !player.IsJumping && !player.IsKeyDown)
            {
                player.IsJumping = true;
                player.Force = 12;
                player.IsKeyDown = true;
            }
        }

        private void keyisup(object sender, KeyEventArgs e)
        {
            if (e.KeyCode == Keys.Space)
            {
                player.IsKeyDown = false;
                if (player.IsJumping)
                    player.Force = 0;
            }

            if (e.KeyCode == Keys.R && gameManager.IsGameOver)
            {
                gameManager.ResetGame(this, player);
            }
        }

        private void pictureBox4_Click(object sender, EventArgs e)
        {
            StartForm Start = new StartForm();
            Start.Show();
            this.Hide();
        }
    }
}
