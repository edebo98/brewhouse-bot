variable "region" {
  default = "us-east-1"
}

variable "instance_type" {
  default = "t2.micro"
}

variable "project_name" {
  default = "brewhouse-bot"
}

variable "state_bucket" {
  description = "S3 bucket name for terraform state"
  type        = string
}