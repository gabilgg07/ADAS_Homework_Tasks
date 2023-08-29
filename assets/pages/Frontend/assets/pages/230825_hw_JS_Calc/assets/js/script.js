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
            "1. Maaşın günə görə hesablanması \n2. Maaşın saata görə hesablanması";
          let calcSalaryCoice = prompt(
            "Müvafiq nömrəni daxil etməklə maaşın hesablanma növünü seçin:\n" +
              calcsSalary
          );

          let salary;
          do {
            salary = parseInt(prompt("Aylıq maaşınızı daxil edin:"));
            if (isNaN(salary)) {
              alert("Maaş düzgün daxil edilməyib");
            }
          } while (isNaN(salary));

          if (calcSalaryCoice !== null) {
            calcSalaryCoice = parseInt(calcSalaryCoice);
            let months;
            let days;
            let hours;
            let totalSalary;
            switch (calcSalaryCoice) {
              case 1:
                do {
                  months = parseInt(
                    prompt(
                      "İşlədiyiniz ayların sayını daxil edin (yoxdursa 0 daxil edin):"
                    )
                  );
                  if (isNaN(months)) {
                    alert("Say düzgün daxil edilməyib");
                  }
                } while (isNaN(months));

                do {
                  days = parseInt(
                    prompt(
                      "İşlədiyiniz günlərin sayını daxil edin (yoxdursa 0 daxil edin):"
                    )
                  );
                  if (isNaN(days)) {
                    alert("Say düzgün daxil edilməyib");
                  }
                } while (isNaN(days));

                totalSalary = months * salary + days * (salary / 26);

                alert(`Alacağınız maaş miqdarı: ${totalSalary.toFixed(2)}`);

                return;
              case 2:
                do {
                  months = parseInt(
                    prompt(
                      "İşlədiyiniz ayların sayını daxil edin (yoxdursa 0 daxil edin):"
                    )
                  );
                  if (isNaN(months)) {
                    alert("Say düzgün daxil edilməyib");
                  }
                } while (isNaN(months));

                do {
                  days = parseInt(
                    prompt(
                      "İşlədiyiniz günlərin sayını daxil edin (yoxdursa 0 daxil edin):"
                    )
                  );
                  if (isNaN(days)) {
                    alert("Say düzgün daxil edilməyib");
                  }
                } while (isNaN(days));

                do {
                  hours = parseInt(
                    prompt(
                      "İşlədiyiniz saatların sayını daxil edin (yoxdursa 0 daxil edin):"
                    )
                  );
                  if (isNaN(hours)) {
                    alert("Say düzgün daxil edilməyib");
                  }
                } while (isNaN(hours));

                totalSalary =
                  months * salary + (days * 8 + hours) * (salary / 208);

                alert(`Alacağınız maaş miqdarı: ${totalSalary.toFixed(2)}`);

                return;
              default:
                alert("Yanlış seçim");
            }
          } else {
            alert("Canceled");
          }
          break;
        case 2:
          let age = prompt("Yaşınızı daxil edin: ");
          if (age !== null) {
            age = parseInt(age);
            if (age >= 18 && age <= 65) {
              let weight;
              do {
                weight = prompt("Çəkinizi daxil edin (kq-la): ");
                if (weight !== null) {
                  weight = parseInt(weight);
                  if (weight <= 0 || isNaN(weight)) {
                    alert("Çəkinizi düzgün daxil edin");
                  }
                } else {
                  alert("İmtina etdiniz");
                }
              } while ((weight <= 0 || isNaN(weight)) && weight !== null);
              let height;
              do {
                height = prompt("Boyunuzu daxil edin (sm-lə): ");
                if (height !== null) {
                  height = parseInt(height);
                  if (height <= 0 || isNaN(height)) {
                    alert("Boyunuzu düzgün daxil edin");
                  }
                } else {
                  alert("İmtina etdiniz");
                }
              } while ((height <= 0 || isNaN(height)) && height !== null);

              if (height > 0) {
                let bmi = weight / (height / 100) ** 2;
                alert(`Bədən Kütlə İndeksiniz: ${bmi.toFixed(1)}`);
                return;
              } else {
              }
            } else {
              alert("BMI düsturu sizin yaşınıza uyğun deyil");
            }
          } else {
            alert("İmtina etdiniz");
          }
          break;
        case 3:
          alert("Sistemdən çıxdınız");
          break;
        default:
          alert("Yanlış seçim");
      }
    } else {
      alert("İmtina etdiniz");
    }
  } while (calcCoice !== 3 && calcCoice !== null);
});
