Add-Type -AssemblyName System.Drawing
$srcPath = "D:\My Professional Studio\02_UI_UX_Design\My ui\assets\logo_monogram.jpg"
$outPath = "D:\My Professional Studio\02_UI_UX_Design\My ui\assets\logo_transparent.png"

$bmp = [System.Drawing.Bitmap]::FromFile($srcPath)
$width = $bmp.Width
$height = $bmp.Height

$newBmp = New-Object System.Drawing.Bitmap($width, $height, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)

# Find bounding box for auto-crop
$minX = $width; $maxX = 0; $minY = $height; $maxY = 0

for ($y = 0; $y -lt $height; $y++) {
    for ($x = 0; $x -lt $width; $x++) {
        $c = $bmp.GetPixel($x, $y)
        $r = [double]$c.R
        $g = [double]$c.G
        $b = [double]$c.B
        $maxC = [Math]::Max($r, [Math]::Max($g, $b))
        
        if ($maxC -lt 12) {
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb(0, 0, 0, 0))
        } else {
            if ($x -lt $minX) { $minX = $x }
            if ($x -gt $maxX) { $maxX = $x }
            if ($y -lt $minY) { $minY = $y }
            if ($y -gt $maxY) { $maxY = $y }
            
            # Smooth alpha feathering on dark edge
            $alpha = 255
            if ($maxC -lt 50) {
                $alpha = [int](($maxC - 12) / (50 - 12) * 255)
                if ($alpha -gt 255) { $alpha = 255 }
                if ($alpha -lt 0) { $alpha = 0 }
            }
            
            # Color recovery to avoid black fringe
            $normFactor = 1.0
            if ($alpha -lt 255 -and $alpha -gt 0) {
                $normFactor = 255.0 / $alpha
            }
            $nr = [Math]::Min(255, [int]($r * $normFactor))
            $ng = [Math]::Min(255, [int]($g * $normFactor))
            $nb = [Math]::Min(255, [int]($b * $normFactor))
            
            $newBmp.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($alpha, $nr, $ng, $nb))
        }
    }
}
$bmp.Dispose()

# Crop to content with a 15px padding
$pad = 15
$cropX = [Math]::Max(0, $minX - $pad)
$cropY = [Math]::Max(0, $minY - $pad)
$cropW = [Math]::Min($width - $cropX, ($maxX - $minX) + ($pad * 2))
$cropH = [Math]::Min($height - $cropY, ($maxY - $minY) + ($pad * 2))

$cropRect = New-Object System.Drawing.Rectangle($cropX, $cropY, $cropW, $cropH)
$croppedBmp = $newBmp.Clone($cropRect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
$newBmp.Dispose()

$croppedBmp.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$croppedBmp.Dispose()

Write-Host "Logo cutout saved: $outPath, Dimensions: ${cropW}x${cropH}"
