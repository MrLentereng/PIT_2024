const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Статическая отдача файлов из корня и папки public
app.use(express.static('public'));
app.use(express.static('.'));

// Настройка хранилища для multer с динамическим определением папки назначения
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Получаем фамилию и имя из полей формы
    const surname = req.body.surname ? req.body.surname.trim() : 'UNKNOWN';
    const firstname = req.body.firstname ? req.body.firstname.trim() : 'UNKNOWN';
    // Формируем путь: uploads/ФАМИЛИЯ_ІМ'Я (например, IVANOV_IVAN)
    const folderName = `${surname}_${firstname}`;
    const uploadPath = path.join(__dirname, 'uploads', folderName);

    // Создаем папку, если она не существует
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    // Сохраняем файл с оригинальным именем
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

// Обработка нескольких полей для файлов
const cpUpload = upload.fields([
  { name: 'pit-11[]', maxCount: 10 },
  { name: 'pit-2023[]', maxCount: 10 }
]);

// Маршрут для приема данных формы и файлов
app.post('/upload', cpUpload, (req, res) => {
  console.log('Данные формы:', req.body);
  console.log('Загруженные файлы:', req.files);

  // Формирование пути загрузки
  const surname = req.body.surname ? req.body.surname.trim() : 'UNKNOWN';
  const firstname = req.body.firstname ? req.body.firstname.trim() : 'UNKNOWN';
  const folderName = `${surname}_${firstname}`;
  const uploadPath = path.join(__dirname, 'uploads', folderName);

  // Формирование текстового содержимого файла с данными
  const textContent = 
`Прізвище: ${req.body.surname || ''}
Ім’я: ${req.body.firstname || ''}
Тип ID: ${req.body['id-type'] || ''}
Номер ID: ${req.body['id-number'] || ''}
Номер банківського рахунку: ${req.body['bank-account'] || ''}
Тип банку: ${req.body['bank-type'] || ''}
SWIFT-код: ${req.body['swift-code'] || ''}
Електронна пошта: ${req.body.email || ''}
Адреса проживання (країна): ${req.body['residence-country'] || ''}

--- Україна ---
Область: ${req.body['ukraine-region'] || ''}
Район: ${req.body['ukraine-district'] || ''}
Місто-Село: ${req.body['ukraine-city'] || ''}
Вулиця: ${req.body['ukraine-street'] || ''}
Номер будинку: ${req.body['ukraine-house'] || ''}
Номер квартири: ${req.body['ukraine-apartment'] || ''}
Поштовий індекс: ${req.body['ukraine-postal'] || ''}

--- Польща ---
Województwo: ${req.body['poland-wojewodztwo'] || ''}
Powiant: ${req.body['poland-powiant'] || ''}
Gmina: ${req.body['poland-gmina'] || ''}
Miejscowość: ${req.body['poland-city'] || ''}
Ulica: ${req.body['poland-street'] || ''}
Numer domu: ${req.body['poland-house'] || ''}
Numer lokalu: ${req.body['poland-apartment'] || ''}
Kod pocztowy: ${req.body['poland-postal'] || ''}

--- Інша країна ---
Адреса проживання: ${req.body['other-address-input'] || ''}
Поштовий індекс: ${req.body['other-postal'] || ''}
`;

  // Путь для текстового файла, например data.txt
  const dataFilePath = path.join(uploadPath, 'data.txt');

  // Запись данных формы в текстовый файл
  fs.writeFile(dataFilePath, textContent, (err) => {
    if (err) {
      console.error('Ошибка при записи данных в файл:', err);
      return res.status(500).send('Ошибка при сохранении данных');
    }
    res.send('Файлы и информация получены.');
  });
});

// Отдаем index.html при обращении к корню
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});
