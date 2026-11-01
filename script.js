document.addEventListener("DOMContentLoaded", () => {
    
    const favButtons = document.querySelectorAll(".fav-btn");
    const favCountDisplay = document.getElementById("fav-count");
    const recipeCards = document.querySelectorAll(".recipe-card");
    const searchInput = document.getElementById("search-input");
    const checkboxes = document.querySelectorAll(".filter-group input[type='checkbox']");
    const filterBtn = document.querySelector(".filter-btn");
    const navHome = document.getElementById("nav-home");
    const navFav = document.getElementById("nav-fav");

    let favCount = 0;
    let isFavView = false;
    let currentSearch = "";

    // 1. ANASAYFA / FAVORİLER SEKMESİ GEÇİŞİ
    navHome.addEventListener("click", (e) => {
        e.preventDefault();
        isFavView = false;
        navHome.classList.add("active");
        navFav.classList.remove("active");
        applyAllFilters();
    });

    navFav.addEventListener("click", (e) => {
        e.preventDefault();
        isFavView = true;
        navFav.classList.add("active");
        navHome.classList.remove("active");
        applyAllFilters();
    });

    // 2. FAVORİYE EKLEME
    favButtons.forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation(); 
            const icon = btn.querySelector("i");
            
            if (icon.classList.contains("fa-solid")) {
                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");
                btn.classList.remove("active");
                favCount--;
            } else {
                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");
                btn.classList.add("active");
                favCount++;
            }
            favCountDisplay.textContent = favCount;
            
            // Eğer favoriler sayfasındaysan listeyi anında güncelle
            if(isFavView) applyAllFilters();
        });
    });

    // 3. FİLTRE BUTONLARI ("Tümü" seçeneği tek çalışsın)
    checkboxes.forEach(cb => {
        cb.addEventListener('change', function() {
            if (this.value === 'tumu' && this.checked) {
                checkboxes.forEach(c => { if(c !== this) c.checked = false; });
            } else if (this.checked) {
                document.querySelector("input[value='tumu']").checked = false;
            }
        });
    });

    filterBtn.addEventListener("click", () => {
        const originalText = filterBtn.innerText;
        filterBtn.innerText = "Uygulandı!";
        filterBtn.style.backgroundColor = "var(--theme-orange)";
        
        setTimeout(() => {
            filterBtn.innerText = originalText;
            filterBtn.style.backgroundColor = "var(--theme-green)";
        }, 800);
        
        applyAllFilters();
    });

    // 4. ARAMA
    searchInput.addEventListener("input", (e) => {
        currentSearch = e.target.value.toLowerCase();
        applyAllFilters();
    });

    // ANA FİLTRELEME MOTORU (Arama + Kategori + Favori Sekmesi)
    function applyAllFilters() {
        // Seçili checkboxları topla
        const checkedValues = Array.from(checkboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);

        // "Tümü" işaretliyse veya hiçbir şey işaretli değilse hepsini göster
        const isTumu = checkedValues.includes('tumu') || checkedValues.length === 0;

        recipeCards.forEach(card => {
            const category = card.getAttribute('data-category');
            const isFavorited = card.querySelector('.fav-btn').classList.contains('active');
            const title = card.querySelector(".recipe-title").innerText.toLowerCase();

            const matchesFilter = isTumu || checkedValues.includes(category);
            const matchesView = isFavView ? isFavorited : true;
            const matchesSearch = title.includes(currentSearch);

            // Üç durumu da karşılıyorsa göster, yoksa gizle
            if (matchesFilter && matchesView && matchesSearch) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    }

    // 5. YILDIZLI PUANLAMA & KİŞİ SAYISI ARTIRMA
    const stars = document.querySelectorAll(".rating i");
    stars.forEach(star => {
        star.addEventListener("click", (e) => {
            e.stopPropagation(); // Kart detayının açılmasını engelle
            const parentRating = star.parentElement;
            
            // Eğer daha önce puan verilmediyse kişi sayısını 1 artır
            if(!parentRating.classList.contains('voted')) {
                parentRating.classList.add('voted');
                const countSpan = parentRating.querySelector('.rating-count');
                let currentCount = parseInt(countSpan.getAttribute('data-count'));
                currentCount++; // Sayıyı artır
                countSpan.setAttribute('data-count', currentCount);
                countSpan.innerText = `(${currentCount} kişi puanladı)`;
            }

            // Yıldızları boya
            const value = parseInt(star.getAttribute("data-value"));
            const siblingStars = parentRating.querySelectorAll("i");
            
            siblingStars.forEach((s, index) => {
                if (index < value) {
                    s.classList.remove("fa-regular");
                    s.classList.add("fa-solid", "active");
                } else {
                    s.classList.remove("fa-solid", "active");
                    s.classList.add("fa-regular");
                }
            });
        });
    });

    // 6. TARİF DETAY MODALI (Daha önceki verilerle aynı)
    const recipeData = {
        "antrikot": {
            title: "Fırında Baharatlı Antrikot",
            img: "images.jpg", // Tıkladığında açılan pencerede de aynı yerel görsel çıksın
            ingredients: ["2 Dilim Dana Antrikot", "3 Yemek Kaşığı Zeytinyağı", "2 Diş Ezilmiş Sarımsak", "Taze Kekik, Karabiber, Kaya Tuzu", "1 Yemek Kaşığı Tereyağı"],
            steps: "1. Antrikotları zeytinyağı, sarımsak ve karabiber ile marine edip buzdolabında en az 1 saat dinlendirin.\n\n2. Döküm tavayı yüksek ateşte iyice ısıtın.\n\n3. Etlerin her iki yüzeyini 2'şer dakika mühürleyin. Mühürlerken tavaya tereyağı ve kekik atıp aromasını ete yedirin.\n\n4. Mühürlenen etleri önceden ısıtılmış 190 derece fırında 8-10 dakika pişirin. Tuzu fırından çıkınca ekleyin."
        },
        "salata": {
            title: "Avokadolu Taze Kase",
            img: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80",
            ingredients: ["1 Adet Olgun Avokado", "1 Su Bardağı Haşlanmış Nohut", "Taze Roka ve Kuzu Kulağı", "Çeri Domates", "Limon Suyu ve Sızma Zeytinyağı"],
            steps: "1. Yeşillikleri yıkayıp iyice kurulayın ve servis kasesine alın.\n\n2. Avokadoyu dilimleyin ve yeşilliklerin üzerine yerleştirin.\n\n3. Haşlanmış nohutları ve ikiye bölünmüş çeri domatesleri ekleyin.\n\n4. Ayrı bir kapta zeytinyağı, taze sıkılmış limon suyu ve çok az tuzu çırpıp salatanın üzerinde gezdirin."
        },
        "makarna": {
            title: "Glutensiz Pesto Soslu Penne",
            img: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=80",
            ingredients: ["Yarım Paket Glutensiz Penne Makarna", "1 Demet Taze Fesleğen", "2 Yemek Kaşığı Çam Fıstığı (Ceviz de olur)", "1 Çay Bardağı Sızma Zeytinyağı", "2 Diş Sarımsak", "Parmesan veya Eski Kaşar"],
            steps: "1. Glutensiz makarnayı paket üzerindeki talimata göre kaynar tuzlu suda haşlayın.\n\n2. Pesto sos için; fesleğen, çam fıstığı, zeytinyağı, sarımsak ve peyniri mutfak robotundan geçirin.\n\n3. Makarnayı süzün (yarım çay bardağı haşlama suyundan ayırın).\n\n4. Makarnayı tencereye geri alın, hazırladığınız sosu ve ayırdığınız suyu ekleyip kısık ateşte 1-2 dakika karıştırarak sosu yedirin."
        }
    };

    const modal = document.getElementById("recipe-modal");
    const closeBtn = document.querySelector(".close-btn");

    recipeCards.forEach(card => {
        card.addEventListener("click", () => {
            const recipeId = card.getAttribute("data-id");
            const data = recipeData[recipeId];

            if(data) {
                document.getElementById("modal-img").src = data.img;
                document.getElementById("modal-title").innerText = data.title;
                
                const ul = document.getElementById("modal-ingredients");
                ul.innerHTML = "";
                data.ingredients.forEach(item => {
                    const li = document.createElement("li");
                    li.innerText = item;
                    ul.appendChild(li);
                });

                document.getElementById("modal-steps").innerText = data.steps;
                modal.style.display = "flex";
            }
        });
    });

    closeBtn.addEventListener("click", () => { modal.style.display = "none"; });
    window.addEventListener("click", (e) => { if (e.target === modal) modal.style.display = "none"; });

});