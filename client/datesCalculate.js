export const countDateAndPrice = (startDate, endDate,hotelPrice,roomPrice) => {
    // console.log(startDate, endDate)
    const secondsOfDay = 86400 * 1000
    const days = (Math.abs(endDate?.getTime() - startDate?.getTime()) || 0) / secondsOfDay
    const totalHotelPrice = hotelPrice * days || 0
    const totalRoomPrice = roomPrice * days || 0
    return {days, totalHotelPrice, totalRoomPrice} 
}

export const reservationDatesList = (startDate, endDate) => {
    // console.log(startDate, endDate)
    const recordDates = new Date(startDate)
    const stopRecord = new Date(endDate)
    const datesList = []
    while (recordDates <= stopRecord) {
        datesList.push(recordDates.getTime())
        recordDates.setDate(recordDates.getDate() + 1)
    }
    return { datesList }
}