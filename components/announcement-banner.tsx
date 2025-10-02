"use client"

export function AnnouncementBanner() {
  return (
    <div className="w-full bg-yellow-600 text-black py-1.5 overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap inline-block">
        <span className="text-xs font-medium px-4">
          ⚠️ Purchase your sky-code from the website directly & don't use opay bank for payment at this time, opay bank
          service is currently experiencing issues, ensure you use other support bank for payment
        </span>
        <span className="text-xs font-medium px-4">
          ⚠️ Purchase your sky-code from the website directly & don't use opay bank for payment at this time, opay bank
          service is currently experiencing issues, ensure you use other support bank for payment
        </span>
      </div>
    </div>
  )
}
