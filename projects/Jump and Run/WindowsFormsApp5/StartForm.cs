using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace WindowsFormsApp5
{
    public partial class StartForm: Form
    {
        public StartForm()
        {
            InitializeComponent();

            this.FormClosed += StartForm_FormClosed;
        }

        private void StartForm_FormClosed(object sender, FormClosedEventArgs e)
        {
            Application.Exit();
        }

        private void button1_Click(object sender, EventArgs e)
        {
            this.Hide(); 

            Form1 form1 = new Form1();


            form1.Show(); 
        }

        private void button2_Click(object sender, EventArgs e)
        {
            this.Hide();

            Controls control = new Controls();


            control.FormClosed += (s, args) => this.Show();

            control.Show();
        }
    }
}
