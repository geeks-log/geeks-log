terraform {
  backend "remote" {
    organization = "geeks-log"
    workspaces {
      name = "geeks-log"
    }
  }
}
