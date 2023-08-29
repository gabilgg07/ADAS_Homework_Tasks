"use strict";

const showSalaryCalc = document.getElementById("showSalaryCalc");

showSalaryCalc.addEventListener("click", function () {
  let calcCoice;
  do {
    let calcs =
      "1. İşçinin maaşının hesablanması \n2. BMI - Bədən Kütləsi İndeksi hesablanması\n3. Proqramdan Çıxış";

    calcCoice = prompt(
      "Müvafiq nömrəni daxil etməklə hesablamanı seçin:\n" + calcs
    );

    if (calcCoice !== null) {
      calcCoice = parseInt(calcCoice);
      switch (calcCoice) {
        case 1:
          let calcsSalary =
            "1. Günə görə maaşın hesablanması \n2. Saata görə maaşın hesablanması";

          let calcSalaryCoice;

          do {
            calcSalaryCoice = prompt(
              "Maaşın hesablanma növünü seçin:\n" + calcsSalary
            );

            if (calcSalaryCoice !== null) {
              calcSalaryCoice = parseInt(calcSalaryCoice);
              let salary;
              let months;
              let days;
              let hours;
              let totalSalary;
              switch (calcSalaryCoice) {
                case 1:
                  salary = getMonthSalary();
                  months = getCountDate("ayların");
                  days = getCountDate("günlərin");

                  totalSalary = months * salary + days * (salary / 26);

                  alert(`Alacağınız maaş miqdarı: ${totalSalary.toFixed(2)}`);

                  return;
                case 2:
                  salary = getMonthSalary();
                  months = getCountDate("ayların");
                  days = getCountDate("günlərin");
                  hours = getCountDate("saatların");

                  totalSalary =
                    months * salary + (days * 8 + hours) * (salary / 208);

                  alert(`Alacağınız maaş miqdarı: ${totalSalary.toFixed(2)}`);

                  return;
                default:
                  alert("Yanlış seçim (─ ‿ ─)");
              }
            } else {
              alert("Seçimdən imtina etdiniz, əsas menuya qayıdırıq (*′☉.̫☉)");
            }
          } while (
            calcSalaryCoice !== null &&
            (calcSalaryCoice !== 1 || calcSalaryCoice !== 2)
          );

          break;
        case 2:
          let age = prompt("Yaşınızı daxil edin: ");
          if (age !== null) {
            age = parseInt(age);
            if (age >= 18 && age <= 65) {
              let weight = getNumFromPrompt(
                "Çəkinizi daxil edin (kq-la): ",
                "Çəkinizi düzgün daxil edin",
                "İmtina etdiniz"
              );

              if (!weight) return;
              let height = getNumFromPrompt(
                "Boyunuzu daxil edin (sm-lə): ",
                "Boyunuzu düzgün daxil edin",
                "İmtina etdiniz"
              );
              if (!height) return;

              let bmi = weight / (height / 100) ** 2;
              alert(`Bədən Kütlə İndeksiniz: ${bmi.toFixed(1)}`);
              return;
            } else {
              alert("BMI düsturu sizin yaşınıza uyğun deyil (｡•́‿ •̀｡)");
              return;
            }
          } else {
            alert("Seçimdən imtina etdiniz, əsas menuya qayıdırıq (︶ω︶)");
          }
          break;
        case 3:
          alert("Sistemdən çıxdınız (╥﹏╥)");
          return;
        default:
          alert("Yanlış seçim (｡- .•)");
      }
    } else {
      alert("Proqramdan istifadə etdiyiniz üçün təşəkkürlər (๑✧◡✧๑)");
      return;
    }
  } while (calcCoice !== 3);
});

function getCountDate(text) {
  let countDate;
  do {
    countDate = parseInt(
      prompt(`İşlədiyiniz ${text} sayını daxil edin (yoxdursa 0 daxil edin):`)
    );
    if (isNaN(countDate)) {
      alert("Say düzgün daxil edilməyib ( · ❛ ֊ ❛)");
    }
  } while (isNaN(countDate));

  return countDate;
}

function getMonthSalary() {
  let salary;
  do {
    salary = parseInt(prompt("Aylıq maaşınızı daxil edin:"));
    if (isNaN(salary)) {
      alert("Maaş düzgün daxil edilməyib");
    }
  } while (isNaN(salary));

  return salary;
}

function getNumFromPrompt(infoTxt, warningTxt, cancelTxt) {
  let num;
  do {
    num = prompt(infoTxt);
    if (num !== null) {
      num = parseInt(num);
      if (num <= 0 || isNaN(num)) {
        alert(warningTxt);
      }
    } else {
      alert(cancelTxt);
      return;
    }
  } while ((num <= 0 || isNaN(num)) && num !== null);

  return num;
}
