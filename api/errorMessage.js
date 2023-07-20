const errorMessage = (status, message, err) => {
    const error = new Error()
    const originalErr = err?.message || "條件錯誤"
    error.status = status
    error.message=message //+ "\n錯誤詳細描述:" + originalErr
    error.statusText=message;
    return error
}

export default errorMessage