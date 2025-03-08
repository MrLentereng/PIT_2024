document.addEventListener("DOMContentLoaded", function () {
  const idRadios = document.querySelectorAll('input[name="id-type"]');
  const idNumberInput = document.getElementById("id-number");

  idRadios.forEach(radio => {
    radio.addEventListener("change", function () {
      idNumberInput.disabled = false;
      idNumberInput.required = true;
      idNumberInput.placeholder = `Введіть ${this.value.toUpperCase()}`;
    });
  });

  const bankType = document.getElementById("bank-type");
  const swiftContainer = document.getElementById("swift-container");

  bankType.addEventListener("change", function () {
    swiftContainer.style.display = this.value === "other" ? "block" : "none";
  });

  const pitCheck = document.getElementById("pit-2023-check");
  const pitContainer = document.getElementById("pit-2023-container");

  pitCheck.addEventListener("change", function () {
    pitContainer.style.display = this.checked ? "block" : "none";
  });

  // Обработка выбора адреса
  const residenceCountry = document.getElementById("residence-country");
  const ukraineAddress = document.getElementById("ukraine-address");
  const polandAddress = document.getElementById("poland-address");
  const otherAddress = document.getElementById("other-address");

  residenceCountry.addEventListener("change", function () {
    if (this.value === "ukraine") {
      ukraineAddress.style.display = "block";
      polandAddress.style.display = "none";
      otherAddress.style.display = "none";
      
      // Включаем поля для Украины и отключаем для остальных
      ukraineAddress.querySelectorAll("input").forEach(el => el.disabled = false);
      polandAddress.querySelectorAll("input").forEach(el => el.disabled = true);
      otherAddress.querySelectorAll("input").forEach(el => el.disabled = true);
    } else if (this.value === "poland") {
      ukraineAddress.style.display = "none";
      polandAddress.style.display = "block";
      otherAddress.style.display = "none";
      
      ukraineAddress.querySelectorAll("input").forEach(el => el.disabled = true);
      polandAddress.querySelectorAll("input").forEach(el => el.disabled = false);
      otherAddress.querySelectorAll("input").forEach(el => el.disabled = true);
    } else if (this.value === "other") {
      ukraineAddress.style.display = "none";
      polandAddress.style.display = "none";
      otherAddress.style.display = "block";
      
      ukraineAddress.querySelectorAll("input").forEach(el => el.disabled = true);
      polandAddress.querySelectorAll("input").forEach(el => el.disabled = true);
      otherAddress.querySelectorAll("input").forEach(el => el.disabled = false);
    } else {
      // Если страна не выбрана – скрываем все и отключаем поля
      ukraineAddress.style.display = "none";
      polandAddress.style.display = "none";
      otherAddress.style.display = "none";
      
      ukraineAddress.querySelectorAll("input").forEach(el => el.disabled = true);
      polandAddress.querySelectorAll("input").forEach(el => el.disabled = true);
      otherAddress.querySelectorAll("input").forEach(el => el.disabled = true);
    }
  });

  // Функция для создания блока загрузки файла с кнопкой удаления
  function createFileInput(name) {
    const wrapper = document.createElement("div");
    wrapper.className = "file-input-wrapper";

    const input = document.createElement("input");
    input.type = "file";
    input.name = name;
    input.accept = ".pdf, .jpg, .png";

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-file-btn";
    removeBtn.textContent = "Видалити файл";
    removeBtn.addEventListener("click", function () {
      wrapper.remove();
    });

    wrapper.appendChild(input);
    wrapper.appendChild(removeBtn);
    return wrapper;
  }

  // Добавление нового файла для ПІТ-11 за 2024 рік
  const addPit11FileBtn = document.getElementById("add-pit11-file");
  if (addPit11FileBtn) {
    addPit11FileBtn.addEventListener("click", function () {
      const container = document.getElementById("pit-11-container");
      container.appendChild(createFileInput("pit-11[]"));
    });
  }

  // Добавление нового файла для ПІТ-11 або ПІТ-37 за 2023 рік
  const addPit2023FileBtn = document.getElementById("add-pit2023-file");
  if (addPit2023FileBtn) {
    addPit2023FileBtn.addEventListener("click", function () {
      const container = document.getElementById("pit-2023-files");
      container.appendChild(createFileInput("pit-2023[]"));
    });
  }
});
