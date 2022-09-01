const getBaseURL = () => process.env.NEXT_PUBLIC_BASE_URL
    ? `https://${process.env.NEXT_PUBLIC_BASE_URL}`
    : "http://localhost:3000";
export default getBaseURL;