
import { useEffect } from 'react'
import './App.css'
import Prayer from './component/prayer'
import { useState } from 'react'

function App() {

  const [prayerTimes, setPrayerTimes] = useState({});
  const [date, setdate] = useState('');
  const [city, setCity] = useState('cairo');




  const cities = [
    { name: 'القاهره', value: 'Cairo' },
    { name: 'الاسكندريه', value: 'Alexandria' },
    { name: 'الجيزه', value: 'Giza' },
    { name: 'المنصوره', value: 'Mansoura' },
    { name: 'الفيوم', value: 'Fayoum' },
    { name: 'طنطا', value: 'Tanta' },
    { name: 'الزقازيق', value: 'Zagazig' },
    { name: 'السويس', value: 'Suez' },
    { name: 'الاسماعليه', value: 'Ismailia' },
    { name: 'الاقصر', value: 'Luxor' },
    { name: 'اسوان', value: 'Aswan' },
  ]
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Egypt&method=5`);
        const data = await response.json();
        setPrayerTimes(data.data.timings);
        setdate(data.data.date.gregorian.date);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, [city]);

  const formatTime = (time) => {
    if (!time) return '00:00';
    let [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'Pm' : 'Am';
    hours = hours % 12 || 12;
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
  }


  return (
    <section>
      <div className="container">
        <div className="top_sec">
          <div className="city">
            <h3>المدينه</h3>
            <select name="" id="" onChange={(e) => setCity(e.target.value)}>
              {cities.map((city) => (
                <option key={city.value} value={city.value}>{city.name}</option>
              ))}
            </select>
          </div>


          <div className="date">
            <h3>التاريخ</h3>
            <h4>{date}</h4>
          </div>

        </div>
        <Prayer name="الفجر :" time={formatTime(prayerTimes.Fajr)} />
        <Prayer name="الشروق :" time={formatTime(prayerTimes.Sunrise)} />
        <Prayer name="الظهر :" time={formatTime(prayerTimes.Dhuhr)} />
        <Prayer name="العصر :" time={formatTime(prayerTimes.Asr)} />
        <Prayer name="المغرب :" time={formatTime(prayerTimes.Maghrib)} />
        <Prayer name="العشاء :" time={formatTime(prayerTimes.Isha)} />
      </div>
    </section>
  )
}

export default App
