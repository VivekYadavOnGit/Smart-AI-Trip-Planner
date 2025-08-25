import React from 'react'

export const LandingNavbar = () => {
    return (<>
        {/* Navigation */}
        <nav className="absolute top-0 left-0 right-0 z-50 p-6">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#ff7e5f] rounded-lg flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-2xl font-bold text-white">SmartAI Trip</span>
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Button variant="ghost" className="text-white hover:bg-white/10">
                        <MapPin className="w-4 h-4 mr-2" />
                        My Trips
                    </Button>
                    <Button className="bg-[#f56551] hover:bg-primary/90 text-primary-foreground shadow-glow">
                        Add Trip
                    </Button>
                </div>
            </div>
        </nav>
    </>
    )
}
