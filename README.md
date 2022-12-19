# Web

## Umgebung
- node.js@v18
- npm@v9 (ist bei Node enthalten)

## Abhängigkeiten installieren und Entwicklungsserver starten

Im Ordner `web` ausführen
```
npm i
npm run dev
```

# MiDaS-master

## Bilder in png konvertieren

```
magick mogrify -format png *.HEIC
magick mogrify -format png *.JPG
magick mogrify -format png *.jpeg
magick mogrify -format png *.jpg
```

## Bilder in jpg mit maximal 259200 pixel skalieren

```
magick '*.png' -resize @259200 resized/%03d.jpg
```

## Bilder in MiDaS-master/input/ kopieren
```
cp -r resized/ ../MiDaS-master/input/
```

## Tiefenbilder generieren
```
python run.py --model_type dpt_large
```
