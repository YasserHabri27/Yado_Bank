$extensions = @(".java", ".js", ".jsx", ".css")
$root = "c:\Users\yasse\Music\kawlasa\architecture\Yado_Bank"
$files = Get-ChildItem -Path $root -Recurse -File | Where-Object { $extensions -contains $_.Extension }

# Regex: Group 1 (Double Quotes), Group 3 (Single Quotes), Else (Comments)
$pattern = '("[^"\\]*(?:\\.[^"\\]*)*")|(''[^''\\]*(?:\\.[^''\\]*)*'')|//.*|/\*[\s\S]*?\*/'

foreach ($file in $files) {
    if ($file.FullName -match "node_modules" -or $file.FullName -match "target" -or $file.FullName -match "\.git" -or $file.FullName -match "dist" -or $file.FullName -match "build") { continue }
    
    $content = [System.IO.File]::ReadAllText($file.FullName)
    
    $newContent = [regex]::Replace($content, $pattern, { param($m)
        # If it matches a string (Group 1 or Group 3), return it as is.
        if ($m.Groups[1].Success -or $m.Groups[3].Success) { return $m.Value }
        # Otherwise it's a comment, return empty string.
        return "" 
    }, [System.Text.RegularExpressions.RegexOptions]::Multiline)
    
    if ($content -ne $newContent) {
        [System.IO.File]::WriteAllText($file.FullName, $newContent)
        Write-Host "Cleaned: $($file.Name)"
    }
}
