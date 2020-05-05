resource "aws_s3_bucket" "geeks_log_assets" {
  bucket = "assets.geeks-log"
  region = var.region.assets
  acl = "private"
}
