import './App.css';
import { FaArrowUp, FaArrowDown, FaNewspaper, FaInfoCircle, FaTimes, FaChevronLeft, FaChevronRight, FaSun, FaCloudRain, FaWind, FaThermometerHalf, FaTint, FaCloud, FaCloudSun, FaCloudMoon } from 'react-icons/fa';
import { useState, useEffect } from 'react';

function App() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [showLeftBanner, setShowLeftBanner] = useState(true);
  const [showRightBanner, setShowRightBanner] = useState(true);
  const [bannerData, setBannerData] = useState({
    leftBanner: {
      titleImageUrl: "",
      products: []
    },
    rightBanner: {
      titleImageUrl: "",
      products: []
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [apiStatus, setApiStatus] = useState("unknown"); // API bağlantı durumu
  const [currencyData, setCurrencyData] = useState({
    DOLAR: { value: "Loading...", change: "0.00", direction: "up" },
    EURO: { value: "Loading...", change: "0.00", direction: "down" },
    STERLİN: { value: "Loading...", change: "0.00", direction: "up" },
    BITCOIN: { value: "Loading...", change: "0.00", direction: "down" },
    BİST: { value: "Loading...", change: "0.00", direction: "up" },
    ALTIN: { value: "Loading...", change: "0.00", direction: "down" },
    FAİZ: { value: "Loading...", change: "0.00", direction: "up" }
  });
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slider verileri için state
  const [sliderData, setSliderData] = useState([
    {
      id: 1,
      title: "Ekonomide Son Gelişmeler",
      description: "Merkez Bankası faiz kararı açıklandı",
      imageUrl: "https://picsum.photos/id/1018/800/400",
      category: "Ekonomi"
    },
    {
      id: 2,
      title: "Spor Haberleri",
      description: "Süper Lig'de haftanın maçları",
      imageUrl: "https://picsum.photos/id/1015/800/400",
      category: "Spor"
    },
    {
      id: 3,
      title: "Teknoloji Dünyasından",
      description: "Yeni nesil akıllı telefonlar tanıtıldı",
      imageUrl: "https://picsum.photos/id/1019/800/400",
      category: "Teknoloji"
    },
    {
      id: 4,
      title: "Dünya Gündemi",
      description: "Küresel iklim değişikliği konferansı başladı",
      imageUrl: "https://picsum.photos/id/1016/800/400",
      category: "Dünya"
    },
    {
      id: 5,
      title: "Kültür Sanat",
      description: "İstanbul Film Festivali yarın başlıyor",
      imageUrl: "https://picsum.photos/id/1022/800/400",
      category: "Kültür"
    },
    {
      id: 6,
      title: "Sağlık Haberleri",
      description: "Uzmanlardan sağlıklı beslenme önerileri",
      imageUrl: "https://picsum.photos/id/1024/800/400",
      category: "Sağlık"
    },
    {
      id: 7,
      title: "Eğitim Dünyası",
      description: "Yeni eğitim-öğretim yılı hazırlıkları tamamlandı",
      imageUrl: "https://picsum.photos/id/1025/800/400",
      category: "Eğitim"
    },
    {
      id: 8,
      title: "Bilim ve Teknoloji",
      description: "Mars'ta yeni keşifler yapıldı",
      imageUrl: "https://picsum.photos/id/1026/800/400",
      category: "Bilim"
    },
    {
      id: 9,
      title: "Yaşam",
      description: "Büyükşehirlerde yaşam maliyeti araştırması",
      imageUrl: "https://picsum.photos/id/1027/800/400",
      category: "Yaşam"
    },
    {
      id: 10,
      title: "Otomobil Dünyası",
      description: "Elektrikli araçlar için yeni teşvikler açıklandı",
      imageUrl: "https://picsum.photos/id/1028/800/400",
      category: "Otomobil"
    }
  ]);

  // Sample news data
  const [newsData, setNewsData] = useState([
    {
      id: 1,
      title: "Ekonomide yeni gelişmeler yaşanıyor",
      preview: "Merkez Bankası'nın son açıklamaları piyasaları hareketlendirdi..."
    },
    {
      id: 2,
      title: "Spor dünyasından son dakika haberleri",
      preview: "Futbol liginde bu hafta önemli gelişmeler yaşandı..."
    },
    {
      id: 3,
      title: "Teknoloji dünyasında yeni gelişmeler",
      preview: "Yapay zeka teknolojileri hayatımızı değiştirmeye devam ediyor..."
    },
    {
      id: 4,
      title: "Eğitim alanında yeni düzenlemeler",
      preview: "Okulların açılış tarihi ile ilgili önemli açıklama geldi..."
    }
  ]);

  // Sample weather data (default values)
  const [weatherData, setWeatherData] = useState({
    currentTemp: "22°C",
    description: "Parçalı bulutlu",
    icon: "🌤️", 
    forecast: [
      { day: "Bugün", temp: "22°C", icon: "🌤️" },
      { day: "Yarın", temp: "23°C", icon: "☀️" }
    ]
  });

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  // Slider kontrolleri
  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === sliderData.length - 1 ? 0 : prevSlide + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide === 0 ? sliderData.length - 1 : prevSlide - 1));
  };

  // API bağlantı durumunu kontrol et
  useEffect(() => {
    const checkApiConnection = async () => {
      try {
        const response = await fetch('/api/SliderNews/1');
        if (response.ok) {
          setApiStatus("connected");
          console.log("API bağlantısı başarılı!");
        } else {
          setApiStatus("error");
          console.error("API bağlantı hatası:", response.status);
        }
      } catch (error) {
        setApiStatus("failed");
        console.error("API bağlantısı kurulamadı:", error.message);
      }
    };

    checkApiConnection();
  }, []);

  // API'den slider haberleri çekme
  useEffect(() => {
    const fetchSliderNews = async () => {
      try {
        const newsItems = [];
        // 10 haber için API'ye istek at
        for (let i = 1; i <= 10; i++) {
          try {
            const response = await fetch(`/api/SliderNews/${i}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              const newsItem = await response.json();
              console.log(`Haber #${i} başarıyla alındı:`, newsItem);
              newsItems.push(newsItem);
            } else {
              console.error(`Haber #${i} alınamadı. Status: ${response.status}`);
            }
          } catch (error) {
            console.error(`Haber #${i} çekilirken hata oluştu:`, error.message);
          }
        }
        
        // En az bir haber çekilebildiyse state'i güncelle
        if (newsItems.length > 0) {
          console.log(`Toplam ${newsItems.length} haber yüklendi.`);
          setSliderData(newsItems);
        } else {
          console.error("Hiç haber çekilemedi!");
        }
      } catch (error) {
        console.error("Slider haberleri çekilirken genel hata oluştu:", error.message);
      }
    };

    fetchSliderNews();
  }, []);

  // Otomatik slider için
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5 saniyede bir slide değişimi

    return () => clearInterval(interval);
  }, []);

  // Fetch banner data from mock API
  useEffect(() => {
    const fetchBannerData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('https://run.mocky.io/v3/47ae876a-1e04-43f1-ab08-1bf63e854557');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setBannerData(data);
        setIsLoading(false);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        console.error("Error fetching banner data:", err);
      }
    };

    fetchBannerData();
  }, []);

  // Fetch TCMB exchange rates, Bitcoin, BIST, gold, and interest rate data
  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // CORS ve XML çözümleme sorunları nedeniyle, doğrudan ExchangeRate API'yi kullanıyoruz
        // Bu, tarayıcıda CORS sorunlarını önlemek için daha güvenilir bir yaklaşımdır
        const exchangeRateResponse = await fetch('https://api.exchangerate-api.com/v4/latest/TRY');
        
        if (!exchangeRateResponse.ok) {
          throw new Error(`HTTP error! Status: ${exchangeRateResponse.status}`);
        }
        
        const exchangeRateData = await exchangeRateResponse.json();
        
        // Calculate inverse rates since we want TRY against other currencies
        const usdRate = (1 / exchangeRateData.rates.USD).toFixed(2);
        const eurRate = (1 / exchangeRateData.rates.EUR).toFixed(2);
        const gbpRate = (1 / exchangeRateData.rates.GBP).toFixed(2);
        
        // Generate random changes for demonstration purposes
        // In a real app, you would compare with previous rates
        const getRandomChange = () => (Math.random() * 0.5).toFixed(2);
        const getRandomDirection = () => Math.random() > 0.5 ? "up" : "down";
        
        // Fetch Bitcoin price in TRY from BtcTurk API
        const bitcoinResponse = await fetch('https://api.btcturk.com/api/v2/ticker?pairSymbol=BTCTRY');
        let bitcoinData = { value: "N/A", change: "0.00", direction: "down" };
        
        if (bitcoinResponse.ok) {
          const bitcoinResult = await bitcoinResponse.json();
          if (bitcoinResult.success && bitcoinResult.data && bitcoinResult.data.length > 0) {
            bitcoinData = {
              value: Number(bitcoinResult.data[0].last).toLocaleString('tr-TR'),
              change: Math.abs(bitcoinResult.data[0].dailyPercent).toFixed(2),
              direction: bitcoinResult.data[0].dailyPercent >= 0 ? "up" : "down"
            };
          }
        } else {
          console.error("Error fetching Bitcoin data");
          // Fallback for Bitcoin
          bitcoinData = {
            value: "1.750.000,00",
            change: "0.25",
            direction: "up"
          };
        }
        
        // Fetch gold price data (using a free gold price API)
        const goldResponse = await fetch('https://api.metals.live/v1/spot/gold');
        let goldData = { value: "N/A", change: "0.00", direction: "down" };
        
        if (goldResponse.ok) {
          const goldResult = await goldResponse.json();
          if (goldResult && goldResult.length > 0) {
            // Convert gold price from USD to TRY and from ounce to gram
            const goldPriceInUsd = goldResult[0].price;
            const goldPriceInTryPerOunce = goldPriceInUsd * parseFloat(usdRate);
            const goldPriceInTryPerGram = goldPriceInTryPerOunce / 31.1035;
            
            goldData = {
              value: goldPriceInTryPerGram.toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}),
              change: getRandomChange(),
              direction: getRandomDirection()
            };
          }
        } else {
          console.error("Error fetching Gold data");
          // Fallback for gold
          goldData = {
            value: "2.345,00",
            change: "0.35",
            direction: "down"
          };
        }
        
        // BIST 100 index data
        const bistData = {
          value: "9.782,56",
          change: "0.45",
          direction: "up"
        };
        
        // Turkey's interest rate (Policy rate)
        const interestRateData = {
          value: "50,00",
          change: "0.00",
          direction: "up"
        };
        
        setCurrencyData({
          DOLAR: { 
            value: parseFloat(usdRate).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
            change: getRandomChange(), 
            direction: getRandomDirection() 
          },
          EURO: { 
            value: parseFloat(eurRate).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
            change: getRandomChange(), 
            direction: getRandomDirection() 
          },
          STERLİN: { 
            value: parseFloat(gbpRate).toLocaleString('tr-TR', {minimumFractionDigits: 2, maximumFractionDigits: 2}), 
            change: getRandomChange(), 
            direction: getRandomDirection() 
          },
          BITCOIN: bitcoinData,
          BİST: bistData,
          ALTIN: goldData,
          FAİZ: interestRateData
        });
      } catch (err) {
        console.error("Error fetching financial data:", err);
        // Fallback values in case all API calls fail
        setCurrencyData({
          DOLAR: { 
            value: "38,71", 
            change: "0.15", 
            direction: "up" 
          },
          EURO: { 
            value: "43,01", 
            change: "0.25", 
            direction: "down" 
          },
          STERLİN: { 
            value: "51,05", 
            change: "0.30", 
            direction: "up" 
          },
          BITCOIN: { 
            value: "1.750.000,00", 
            change: "1.25", 
            direction: "down" 
          },
          BİST: { 
            value: "9.782,56", 
            change: "0.45", 
            direction: "up" 
          },
          ALTIN: { 
            value: "2.345,00", 
            change: "0.35", 
            direction: "down" 
          },
          FAİZ: { 
            value: "50,00", 
            change: "0.00", 
            direction: "up" 
          }
        });
      }
    };

    fetchFinancialData();
    // Set up an interval to fetch data every 5 minutes
    const intervalId = setInterval(fetchFinancialData, 5 * 60 * 1000);
    
    // Clear interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  // Fetch real weather data for Izmir
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Using OpenWeatherMap API to get real data
        const apiKey = "d33a1c8ce7ff38cf75d35b09fde36aec"; // Free API key
        
        // Get current weather
        const currentWeatherResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Izmir,tr&units=metric&appid=${apiKey}`
        );
        
        // Get forecast
        const forecastResponse = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=Izmir,tr&units=metric&appid=${apiKey}`
        );
        
        if (!currentWeatherResponse.ok || !forecastResponse.ok) {
          throw new Error(`HTTP error! Status: ${currentWeatherResponse.status || forecastResponse.status}`);
        }
        
        const currentData = await currentWeatherResponse.json();
        const forecastData = await forecastResponse.json();
        
        // Map weather condition to emoji icon
        const getWeatherIcon = (weatherId, isDay = true) => {
          if (weatherId >= 200 && weatherId < 300) return "⛈️"; // Thunderstorm
          if (weatherId >= 300 && weatherId < 600) return "🌧️"; // Drizzle and Rain
          if (weatherId >= 600 && weatherId < 700) return "❄️"; // Snow
          if (weatherId >= 700 && weatherId < 800) return "🌫️"; // Atmosphere (fog, dust, etc)
          if (weatherId === 800) return isDay ? "☀️" : "🌙"; // Clear sky
          if (weatherId === 801 || weatherId === 802) return isDay ? "🌤️" : "☁️"; // Few or scattered clouds
          return "☁️"; // Broken or overcast clouds
        };
        
        // Get current weather data
        const currentTemp = Math.round(currentData.main.temp);
        const currentWeatherId = currentData.weather[0].id;
        const currentDescription = currentData.weather[0].description;
        
        // Check if it's day or night based on sunrise/sunset times
        const now = Math.floor(Date.now() / 1000); // Current time in seconds
        const isDay = now > currentData.sys.sunrise && now < currentData.sys.sunset;
        
        // Group forecasts by day and take midday forecast (around 12:00-15:00)
        const filteredForecasts = {};
        
        // Get today and tomorrow only
        const today = new Date();
        const todayDate = today.getDate();
        const tomorrowDate = new Date(today);
        tomorrowDate.setDate(todayDate + 1);
        
        const todayDay = today.getDay();
        const tomorrowDay = tomorrowDate.getDay();
        
        forecastData.list.forEach(item => {
          const date = new Date(item.dt * 1000);
          const forecastDate = date.getDate();
          const day = date.getDay();
          const hour = date.getHours();
          
          // Only interested in today and tomorrow
          if (forecastDate === todayDate || forecastDate === todayDate + 1) {
            if (hour >= 12 && hour <= 15) {
              if (!filteredForecasts[forecastDate] || Math.abs(hour - 13) < Math.abs(filteredForecasts[forecastDate].hour - 13)) {
                filteredForecasts[forecastDate] = {
                  forecast: item,
                  hour: hour,
                  day: forecastDate === todayDate ? "Bugün" : "Yarın"
                };
              }
            }
          }
        });
        
        // Convert to array and make sure we have both days
        const dailyForecasts = [];
        if (filteredForecasts[todayDate]) {
          dailyForecasts.push({
            day: "Bugün",
            temp: Math.round(filteredForecasts[todayDate].forecast.main.temp),
            weatherId: filteredForecasts[todayDate].forecast.weather[0].id,
            description: filteredForecasts[todayDate].forecast.weather[0].description
          });
        } else {
          // If no forecast found for today, use current weather
          dailyForecasts.push({
            day: "Bugün",
            temp: currentTemp,
            weatherId: currentWeatherId,
            description: currentDescription
          });
        }
        
        if (filteredForecasts[todayDate + 1]) {
          dailyForecasts.push({
            day: "Yarın",
            temp: Math.round(filteredForecasts[todayDate + 1].forecast.main.temp),
            weatherId: filteredForecasts[todayDate + 1].forecast.weather[0].id,
            description: filteredForecasts[todayDate + 1].forecast.weather[0].description
          });
        } else {
          // If no forecast found for tomorrow, use a reasonable fallback
          const fallbackTomorrow = forecastData.list.find(item => 
            new Date(item.dt * 1000).getDate() === todayDate + 1);
          
          if (fallbackTomorrow) {
            dailyForecasts.push({
              day: "Yarın",
              temp: Math.round(fallbackTomorrow.main.temp),
              weatherId: fallbackTomorrow.weather[0].id,
              description: fallbackTomorrow.weather[0].description
            });
          } else {
            // Worst case, use a dummy forecast based on today
            dailyForecasts.push({
              day: "Yarın",
              temp: currentTemp + (Math.random() > 0.5 ? 1 : -1),
              weatherId: currentWeatherId,
              description: currentDescription
            });
          }
        }
        
        // Format forecast data
        const formattedForecast = dailyForecasts.map(day => ({
          day: day.day,
          temp: `${day.temp}°C`,
          icon: getWeatherIcon(day.weatherId, true),
          description: day.description
        }));
        
        // Update weather data state with real data
        setWeatherData({
          currentTemp: `${currentTemp}°C`,
          description: currentDescription.charAt(0).toUpperCase() + currentDescription.slice(1),
          icon: getWeatherIcon(currentWeatherId, isDay),
          forecast: formattedForecast
        });
        
      } catch (err) {
        console.error("Error fetching weather data:", err);
        // Use fallback data if API call fails
        setWeatherData({
          currentTemp: "22°C",
          description: "Parçalı bulutlu",
          icon: "🌤️", 
          forecast: [
            { day: "Bugün", temp: "22°C", icon: "🌤️" },
            { day: "Yarın", temp: "23°C", icon: "☀️" }
          ]
        });
      }
    };
    
    fetchWeatherData();
    // Fetch weather data every 30 minutes
    const intervalId = setInterval(fetchWeatherData, 30 * 60 * 1000);
    
    return () => clearInterval(intervalId);
  }, []);

  // API'den son haberleri çekme
  useEffect(() => {
    const fetchNewsData = async () => {
      try {
        const newsItems = [];
        // 4 haber için API'ye istek at
        for (let i = 1; i <= 4; i++) {
          try {
            const response = await fetch(`/api/News/${i}`, {
              method: 'GET',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            });
            
            if (response.ok) {
              const newsItem = await response.json();
              console.log(`Haber #${i} başarıyla alındı:`, newsItem);
              // content alanını preview olarak kullan
              newsItems.push({
                id: newsItem.id,
                title: newsItem.title,
                preview: newsItem.content
              });
            } else {
              console.error(`Haber #${i} alınamadı. Status: ${response.status}`);
            }
          } catch (error) {
            console.error(`Haber #${i} çekilirken hata oluştu:`, error.message);
          }
        }
        
        // En az bir haber çekilebildiyse state'i güncelle
        if (newsItems.length > 0) {
          console.log(`Toplam ${newsItems.length} son haber yüklendi.`);
          setNewsData(newsItems);
        } else {
          console.error("Hiç son haber çekilemedi!");
        }
      } catch (error) {
        console.error("Son haberler çekilirken genel hata oluştu:", error.message);
      }
    };

    fetchNewsData();
  }, []);

  // Remove data-bs-toggle attributes on mobile
  useEffect(() => {
    const handleResize = () => {
      const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
      if (window.innerWidth < 992) {
        dropdownToggles.forEach(toggle => {
          toggle.removeAttribute('data-bs-toggle');
        });
      } else {
        dropdownToggles.forEach(toggle => {
          toggle.setAttribute('data-bs-toggle', 'dropdown');
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          <a className="navbar-brand d-lg-none" href="#">
            Daily Bugle <FaNewspaper className="ms-1" />
          </a>
          <button 
            className="navbar-toggler" 
            type="button" 
            onClick={handleNavCollapse}
            aria-expanded={!isNavCollapsed}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`${isNavCollapsed ? 'collapse' : ''} navbar-collapse`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  SON DAKİKA
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://deprem.afad.gov.tr/sondepremler" target="_blank" rel="noopener noreferrer">Acil Durumlar</a></li>
                  <li><a className="dropdown-item" href="https://www.cnnturk.com/son-dakika" target="_blank" rel="noopener noreferrer">Önemli Gelişmeler</a></li>
                  <li><a className="dropdown-item" href="https://www.sozcu.com.tr/son-dakika/" target="_blank" rel="noopener noreferrer">Flaş Haberler</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  YAZARLAR
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.hurriyet.com.tr/yazarlar/" target="_blank" rel="noopener noreferrer">Köşe Yazıları</a></li>
                  <li><a className="dropdown-item" href="https://www.haberturk.com/yazarlar" target="_blank" rel="noopener noreferrer">Analizler</a></li>
                  <li><a className="dropdown-item" href="https://www.milliyet.com.tr/yazarlar/" target="_blank" rel="noopener noreferrer">Yazar Arşivi</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  GÜNDEM
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.hurriyet.com.tr/gundem/" target="_blank" rel="noopener noreferrer">Siyaset</a></li>
                  <li><a className="dropdown-item" href="https://www.sabah.com.tr/gundem" target="_blank" rel="noopener noreferrer">Toplum</a></li>
                  <li><a className="dropdown-item" href="https://www.cnnturk.com/guncel" target="_blank" rel="noopener noreferrer">Güncel Olaylar</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  EKONOMI
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.bloomberght.com/" target="_blank" rel="noopener noreferrer">Piyasalar</a></li>
                  <li><a className="dropdown-item" href="https://www.dunya.com/" target="_blank" rel="noopener noreferrer">İş Dünyası</a></li>
                  <li><a className="dropdown-item" href="https://www.hurriyet.com.tr/ekonomi/" target="_blank" rel="noopener noreferrer">Ekonomi Haberleri</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  DÜNYA
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.bbc.com/turkce/dunya" target="_blank" rel="noopener noreferrer">Uluslararası</a></li>
                  <li><a className="dropdown-item" href="https://www.hurriyet.com.tr/dunya/" target="_blank" rel="noopener noreferrer">Dış Politika</a></li>
                  <li><a className="dropdown-item" href="https://www.bloomberght.com/dunya" target="_blank" rel="noopener noreferrer">Dünya Ekonomisi</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown d-none d-md-block">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  GÜNDEM İÇİNDEN
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.hurriyet.com.tr/gundem/" target="_blank" rel="noopener noreferrer">Öne Çıkanlar</a></li>
                  <li><a className="dropdown-item" href="https://www.sozcu.com.tr/gundem/" target="_blank" rel="noopener noreferrer">Popüler Konular</a></li>
                  <li><a className="dropdown-item" href="https://www.cnnturk.com/guncel" target="_blank" rel="noopener noreferrer">Günün Özeti</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  SPOR
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.fanatik.com.tr/futbol" target="_blank" rel="noopener noreferrer">Futbol</a></li>
                  <li><a className="dropdown-item" href="https://www.ntvspor.net/basketbol" target="_blank" rel="noopener noreferrer">Basketbol</a></li>
                  <li><a className="dropdown-item" href="https://www.ntvspor.net/diger-sporlar" target="_blank" rel="noopener noreferrer">Diğer Sporlar</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown d-none d-lg-block">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  HAYAT
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.hurriyet.com.tr/saglik/" target="_blank" rel="noopener noreferrer">Sağlık</a></li>
                  <li><a className="dropdown-item" href="https://www.hurriyet.com.tr/yasam/" target="_blank" rel="noopener noreferrer">Yaşam</a></li>
                  <li><a className="dropdown-item" href="https://www.milliyet.com.tr/egitim/" target="_blank" rel="noopener noreferrer">Eğitim</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown d-none d-lg-block">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  MAGAZİN
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.hurriyet.com.tr/magazin/" target="_blank" rel="noopener noreferrer">Ünlüler</a></li>
                  <li><a className="dropdown-item" href="https://www.haberturk.com/magazin/moda" target="_blank" rel="noopener noreferrer">Moda</a></li>
                  <li><a className="dropdown-item" href="https://www.sozcu.com.tr/hayatim/eglence/" target="_blank" rel="noopener noreferrer">Eğlence</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  FİNANS
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.borsaistanbul.com/" target="_blank" rel="noopener noreferrer">Borsa</a></li>
                  <li><a className="dropdown-item" href="https://www.doviz.com/" target="_blank" rel="noopener noreferrer">Döviz</a></li>
                  <li><a className="dropdown-item" href="https://www.kriptoparahaber.com/" target="_blank" rel="noopener noreferrer">Kripto</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown d-none d-xl-block">
                <a className="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
                  RESMİ İLANLAR
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="https://www.ilan.gov.tr/" target="_blank" rel="noopener noreferrer">İhaleler</a></li>
                  <li><a className="dropdown-item" href="https://www.resmigazete.gov.tr/ilanlar/eskiilanlar.htm" target="_blank" rel="noopener noreferrer">Duyurular</a></li>
                  <li><a className="dropdown-item" href="https://www.resmigazete.gov.tr/" target="_blank" rel="noopener noreferrer">Resmi Gazete</a></li>
                </ul>
              </li>
            </ul>
            <button className="btn btn-history">Geçmiş</button>
          </div>
        </div>
      </nav>
      <div className="financial-strip">
        <div className="container">
          <div className="financial-items">
            {Object.entries(currencyData).map(([currency, data]) => (
              <div key={currency} className={`financial-item ${data.direction}`}>
                <span className="label">{currency}</span>
                <span className="value">{data.value}</span>
                <span className="change">%{data.change}</span>
                {data.direction === "up" ? 
                  <FaArrowUp className="icon" /> : 
                  <FaArrowDown className="icon" />
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="main-content">
        <div className="main-content-container">
          {/* Left banner */}
          {showLeftBanner && !isLoading && !error && (
            <div className="side-banner-container left-side">
              <div className="ad-banner ad-banner-left">
                <div className="ad-banner-header">
                  <button onClick={() => alert("Banner bilgisi")} title="Bilgi">
                    <FaInfoCircle />
                  </button>
                  <button onClick={() => setShowLeftBanner(false)} title="Kapat">
                    <FaTimes />
                  </button>
                </div>
                <div className="ad-products-container">
                  <div className="ad-product">
                    <img src={bannerData.leftBanner.titleImageUrl} alt="Banner Title" />
                  </div>
                  {bannerData.leftBanner.products.map((product, index) => (
                    <div key={index} className="ad-product">
                      <img src={product.imageUrl} alt={`Ürün ${index + 1}`} />
                      <div className="price">{product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
          {/* Main content area with slider and right sidebar */}
          <div className="center-content">
            {/* Slider component (now on the left) */}
            <div className="slider-container">
              {/* API durumu bildirimi */}
              {apiStatus !== "connected" && (
                <div style={{
                  position: 'absolute', 
                  top: '10px', 
                  left: '10px', 
                  zIndex: 100, 
                  backgroundColor: apiStatus === "error" ? '#f8d7da' : apiStatus === "failed" ? '#f8d7da' : '#cce5ff',
                  color: apiStatus === "error" ? '#721c24' : apiStatus === "failed" ? '#721c24' : '#004085',
                  padding: '10px 15px',
                  borderRadius: '5px',
                  boxShadow: '0 0 10px rgba(0,0,0,0.1)'
                }}>
                  {apiStatus === "unknown" && "API durumu kontrol ediliyor..."}
                  {apiStatus === "error" && "API yanıt verdi ancak bir hata oluştu."}
                  {apiStatus === "failed" && "API'ye bağlanılamadı. Lütfen API servisinin çalıştığından emin olun."}
                </div>
              )}
              
              <div className="slider">
                {sliderData.map((slide, index) => (
                  <div 
                    key={slide.id} 
                    className={`slide ${index === currentSlide ? 'active' : ''}`}
                    style={{
                      transform: `translateX(${100 * (index - currentSlide)}%)`,
                    }}
                  >
                    <img src={slide.imageUrl} alt={slide.title} className="slide-image" />
                    <div className="slide-content">
                      <div className="slide-category">{slide.category}</div>
                      <h2 className="slide-title">{slide.title}</h2>
                      <p className="slide-description">{slide.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="slider-button prev" onClick={prevSlide}>
                <FaChevronLeft />
              </button>
              <button className="slider-button next" onClick={nextSlide}>
                <FaChevronRight />
              </button>
              <div className="slider-dots">
                {sliderData.map((_, index) => (
                  <button 
                    key={index} 
                    className={`slider-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>
            </div>
            
            {/* Right sidebar with news and weather boxes */}
            <div className="right-sidebar">
              {/* News Box */}
              <div className="news-box">
                <div className="news-box-header">Son Haberler</div>
                <div className="news-content">
                  {newsData.map(news => (
                    <div key={news.id} className="news-item">
                      <div className="news-item-title">{news.title}</div>
                      <div className="news-item-preview">{news.preview}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Weather Box */}
              <div className="weather-box">
                <div className="weather-box-header">İzmir Hava Durumu</div>
                <div className="weather-current">
                  <div className="weather-icon">{weatherData.icon}</div>
                  <div className="weather-temp">{weatherData.currentTemp}</div>
                  <div className="weather-desc">{weatherData.description}</div>
                </div>
                <div className="weather-forecast">
                  {weatherData.forecast.map((day, index) => (
                    <div key={index} className="forecast-day">
                      <div className="forecast-day-name">{day.day}</div>
                      <div className="forecast-icon">{day.icon}</div>
                      <div className="forecast-temp">{day.temp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Right banner */}
          {showRightBanner && !isLoading && !error && (
            <div className="side-banner-container right-side">
              <div className="ad-banner ad-banner-right">
                <div className="ad-banner-header">
                  <button onClick={() => alert("Banner bilgisi")} title="Bilgi">
                    <FaInfoCircle />
                  </button>
                  <button onClick={() => setShowRightBanner(false)} title="Kapat">
                    <FaTimes />
                  </button>
                </div>
                <div className="ad-products-container">
                  <div className="ad-product">
                    <img src={bannerData.rightBanner.titleImageUrl} alt="Banner Title" />
                  </div>
                  {bannerData.rightBanner.products.map((product, index) => (
                    <div key={index} className="ad-product">
                      <img src={product.imageUrl} alt={`Ürün ${index + 1}`} />
                      <div className="price">{product.price}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
