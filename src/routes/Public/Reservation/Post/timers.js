const {Reservation}=require("../../../../db");

async function setResrAsExipred(reservation){
  return reservation.update({expired:true})
  .then(async(resr)=>{await resr.save()});
};

//900000 ms = 15 mins.
async function todayResrTimer(reservation, date){
  setTimeout(async ()=>{
    await setResrAsExipred(reservation);
  }, date.getTime() + 900000 - Date.now() );
};

//86400000 ms = 24 hs
async function futureDayResrTimer(reservation, date){
  setTimeout(()=>{
    if(new Date().toISOString().split("T")[0]===date.toISOString().split("T")[0]){
      todayResrTimer(reservation, date)
      .then(()=>{clearInterval(resrDayTimer);});
    }else{
      const resrDayTimer = setInterval(async ()=>{
        if(new Date().toISOString().split("T")[0]===date.toISOString().split("T")[0]){
          todayResrTimer(reservation, date)
          .then(()=>{clearInterval(resrDayTimer);});
        };
      }, 86400000);
    };
  }, new Date().setHours(24, 0, 0) - Date.now() );
};

module.exports = {
  todayResrTimer,
  futureDayResrTimer
};