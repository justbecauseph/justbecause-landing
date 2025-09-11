import React from 'react';

interface ServiceCardProps {
  title: string
  description: string
  icon: React.ReactNode
  index?: number
}
const ServiceCard: React.FC<ServiceCardProps> = React.memo(({ title, description, icon, index = 0 }) => {
  return (
    <div
      className={`group relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 p-8 hover:bg-gradient-to-br hover:from-white/10 hover:to-white/[0.05] overflow-hidden service-card-delay-${index}`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      <div className="absolute top-4 right-4 w-2 h-2 bg-purple-400/30 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-500"></div>
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-blue-400/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-all duration-700"></div>

      <div className="relative z-10">
        <div className="relative mb-6">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-150"></div>
          <div
            className="relative w-16 h-16 bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center border border-white/10 group-hover:border-white/20 group-hover:scale-110 transition-all duration-500"
            aria-hidden="true"
          >
            <div className="text-white/80 group-hover:text-white transition-colors duration-300 group-hover:scale-110 transform transition-transform">
              {icon}
            </div>
          </div>
        </div>

        <h3 className="text-xl font-bold text-white mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-200 group-hover:to-blue-200 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
          {title}
        </h3>

        <p className="text-white/60 leading-relaxed mb-6 group-hover:text-white/80 transition-colors duration-300">
          {description}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-transparent to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
    </div>
  )
});

ServiceCard.displayName = "ServiceCard";

export default ServiceCard
