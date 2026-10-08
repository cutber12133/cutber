
function barberApplication() {
    alert("Berber başvuru sistemi yakında aktif olacak.");
}

/* GİRİŞ VE KAYIT */

function openLogin() {
    document.getElementById("authOverlay").style.display = "flex";
    showLogin();
}

function openRegister() {
    document.getElementById("authOverlay").style.display = "flex";
    showRegister();
}

function showLogin() {
    document.getElementById("loginForm").style.display = "block";
    document.getElementById("registerForm").style.display = "none";
}

function showRegister() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("registerForm").style.display = "block";
}

function closeAuth() {
    document.getElementById("authOverlay").style.display = "none";
}

function closeAuthOutside(event) {
    if (event.target === document.getElementById("authOverlay")) {
        closeAuth();
    }
}

function loginDemo() {
    alert("Giriş sistemi backend bağlantısından sonra aktif olacak.");
}

function registerDemo() {
    const terms = document.getElementById("terms").checked;
    const kvkk = document.getElementById("kvkk").checked;

    if (!terms) {
        alert("Kullanım Koşullarını kabul etmelisin.");
        return;
    }

    if (!kvkk) {
        alert("KVKK Aydınlatma Metnini okuduğunu belirtmelisin.");
        return;
    }

    alert("Kayıt sistemi backend bağlantısından sonra aktif olacak.");
}

/* BERBER LİSTELEME */

function getBarberPrice(barber, serviceName) {
    const service = barber.services.find(
        item => item.name === serviceName
    );

    return service
        ? service.price
        : (barber.services[0]?.price ?? 0);
}


function renderBarbers() {
    const grid = document.getElementById("barberGrid");
    const count = document.getElementById("barberCount");

    if (!grid) return;

    const city = document.getElementById("cityFilter").value;
    const district = document.getElementById("districtFilter").value;
    const service = document.getElementById("serviceFilter").value;
    const sort = document.getElementById("sortFilter").value;

    const shopInput = document.getElementById("searchShop");

    const shopName = shopInput
        ? shopInput.value.trim().toLocaleLowerCase("tr-TR")
        : "";

    let filtered = barbers.filter(barber => {
        const matchesCity = !city || barber.city === city;

        const matchesDistrict =
            !district || barber.district === district;

        const matchesService =
            !service || barber.services.some(
                item => item.name === service
            );

        const matchesName =
            !shopName ||
            barber.name.toLocaleLowerCase("tr-TR").includes(shopName);

        return matchesCity &&
               matchesDistrict &&
               matchesService &&
               matchesName;
    });

    if (sort === "rating") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "price") {
        filtered.sort((a, b) =>
            getBarberPrice(a, service || "Saç Kesimi") -
            getBarberPrice(b, service || "Saç Kesimi")
        );
    }

    if (count) {
        count.textContent = `${filtered.length} demo berber bulundu`;
    }

    grid.innerHTML = filtered.map(barber => {
        const price = getBarberPrice(
            barber,
            service || "Saç Kesimi"
        );

        return `
            <div class="barber-card">
                <div class="barber-card-content">

                    <h3>${barber.name}</h3>

                    <p class="shop-rating">
                        ★ ${barber.rating.toFixed(1)}/5
                        <span>· Dükkân puanı (Demo)</span>
                    </p>

                    <div class="shop-employees">
                        <p class="employees-title">ÇALIŞAN BERBERLER</p>

                        ${(barber.employees || []).map(employee => `
                            <div class="shop-employee">
                                <span>${employee.name}</span>
                                <strong>★ ${employee.rating.toFixed(1)}/5</strong>
                            </div>
                        `).join("")}
                    </div>

                    <p>📍 ${barber.district}, ${barber.city}</p>

                    <div class="barber-card-details">
                        <span>★ ${barber.rating} · Demo puan</span>
                        <strong>${price} TL</strong>
                    </div>

                    <button onclick="selectBarber(${barber.id})">
                        Dükkânı İncele
                    </button>

                </div>
            </div>
        `;
    }).join("");
}


/* ŞEHİR VE İLÇE FİLTRELERİ */

function updateDistricts() {
    const city = document.getElementById("cityFilter").value;
    const districtSelect = document.getElementById("districtFilter");

    districtSelect.innerHTML =
        '<option value="">Tüm İlçeler</option>';

    const districts = city
        ? (cities[city] || [])
        : [...new Set(Object.values(cities).flat())];

    districts.forEach(district => {
        const option = document.createElement("option");
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
    });

    renderBarbers();
}

/* DÜKKÂN İNCELEME */

let selectedBarber = null;

function selectBarber(id) {
    const barber = barbers.find(
        item => String(item.id) === String(id)
    );

    if (!barber) return;

    selectedBarber = barber;

    const content = document.getElementById("shopProfileContent");
    const overlay = document.getElementById("shopOverlay");

    if (!content || !overlay) return;

    content.innerHTML = `
        <img
            class="shop-profile-image"
            src="${barber.image}"
            alt="Demo berber fotoğrafı"
        >

        <h2>${barber.name}</h2>

        <p>📍 ${barber.district}, ${barber.city}</p>
        <p>★ ${barber.rating.toFixed(1)}/5 · Demo dükkân puanı</p>
        <p>
            Çalışma saatleri:
            ${barber.workingHours.start} -
            ${barber.workingHours.end}
        </p>

        <div class="shop-profile-section">
            <h3>Hizmetler ve Fiyatlar</h3>

            ${barber.services.map(service => `
                <div class="shop-service">
                    <span>
                        ${service.name} (${service.duration} dk)
                    </span>
                    <strong>${service.price} TL</strong>
                </div>
            `).join("")}
        </div>

        <div class="shop-profile-section">
            <h3>Çalışan Berberler</h3>

            ${(barber.employees || []).map(employee => `
                <div class="shop-profile-employee">
                    <span>${employee.name}</span>
                    <strong>★ ${employee.rating.toFixed(1)}/5</strong>
                </div>
            `).join("")}
        </div>

        <button class="shop-book-button" onclick="bookDemo()">
            Randevu Al
        </button>
    `;

    overlay.style.display = "flex";
}

function closeShop() {
    const overlay = document.getElementById("shopOverlay");

    if (overlay) {
        overlay.style.display = "none";
    }
}

/* YENİ RANDEVU SAYFASINA GEÇİŞ */

function bookDemo() {
    if (!selectedBarber) {
        alert("Önce bir berber seçmelisiniz.");
        return;
    }

    window.location.href =
        "booking.html?id=" + encodeURIComponent(selectedBarber.id);
}

/* ANA SAYFA ARAMA */


function searchBarber() {
    const konum = document.getElementById("searchLocation").value
        .trim()
        .toLocaleLowerCase("tr-TR");

    const hizmet = document.getElementById("searchService").value
        .trim()
        .toLocaleLowerCase("tr-TR");

    const cityFilter = document.getElementById("cityFilter");
    const districtFilter = document.getElementById("districtFilter");
    const serviceFilter = document.getElementById("serviceFilter");

    const sehir = [...cityFilter.options].find(option =>
        konum !== "" &&
        option.text.toLocaleLowerCase("tr-TR").includes(konum)
    );

    const ilce = [...new Set(barbers.map(b => b.district))].find(name =>
        konum !== "" &&
        name.toLocaleLowerCase("tr-TR").includes(konum)
    );

    if (sehir) {
        cityFilter.value = sehir.value;
        updateDistricts();
    } else if (ilce) {
        const dukkan = barbers.find(b => b.district === ilce);

        cityFilter.value = dukkan.city;
        updateDistricts();

        districtFilter.value = ilce;
    } else {
        cityFilter.value = "";
        updateDistricts();
    }

    const bulunanHizmet = [...serviceFilter.options].find(option =>
        hizmet !== "" &&
        option.text.toLocaleLowerCase("tr-TR").includes(hizmet)
    );

    serviceFilter.value = bulunanHizmet
        ? bulunanHizmet.value
        : "";

    renderBarbers();

    const list = document.getElementById("barber-list");

    if (list) {
        list.scrollIntoView({ behavior: "smooth" });
    }
}


/* SİSTEMİ BAŞLAT */

function initializeBarbers() {
    const citySelect = document.getElementById("cityFilter");

    if (!citySelect) return;

    Object.keys(cities).forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        citySelect.appendChild(option);
    });

    citySelect.addEventListener("change", updateDistricts);

    document.getElementById("districtFilter")
        .addEventListener("change", renderBarbers);

    document.getElementById("serviceFilter")
        .addEventListener("change", renderBarbers);

    document.getElementById("sortFilter")
        .addEventListener("change", renderBarbers);

    updateDistricts();
}

document.addEventListener("DOMContentLoaded", initializeBarbers);
document.getElementById("searchShop")?.addEventListener("input", function () {
    renderBarbers();
});