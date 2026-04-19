terraform {
  backend "s3" {
    bucket  = "brewhouse-terraform-state-edebo"
    key     = "brewhouse-bot/terraform.tfstate"
    region  = "us-east-1"
    encrypt = true
  }
}