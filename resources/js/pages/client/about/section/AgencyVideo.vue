<template>
    <div class="text-center max-w-3xl mx-auto px-4">
        <span>
            <h2 class="text-2xl md:text-3xl font-bold text-[var(--tertiary-custom)]">Behind Our Stories</h2>
        </span>
        <p class="mt-3 text-sm md:text-base text-[var(--muted-custom)]">
            Learn more about Reliable International Travel Services through our featured videos. Discover our journey, meet our team, and see how we help travelers create unforgettable experiences around the world.
        </p>
    </div>
    
    <!-- Responsive Grid: 1 col on mobile, 2 cols on tablet, 3 cols on laptop -->
    <section class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 py-8">
        <div class="flex flex-col gap-2 w-full max-w-[315px] mx-auto">
            <div class="w-full aspect-[9/16]">
                <iframe class="w-full h-full rounded-lg" src="https://www.youtube.com/embed/G6Sag2iQt8k" title="TOP REVENUE PARTNER: A Milestone for Reliable International Travel Services! 🏆✨" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
        
        <div class="flex flex-col gap-2 w-full max-w-[315px] mx-auto">
            <div class="w-full aspect-[9/16]">
                <iframe class="w-full h-full rounded-lg" src="https://www.youtube.com/embed/lbOasvp3PEU" title="Reliable International Travel Services: 17 Years of Excellence &amp; Reliability #reliableservice" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
        
        <!-- sm:col-span-2 centers the 3rd video on tablet layouts, lg:col-span-1 resets it for laptop -->
        <div class="flex flex-col gap-2 w-full max-w-[315px] mx-auto sm:col-span-2 lg:col-span-1">
            <div class="w-full aspect-[9/16]">
                <iframe class="w-full h-full rounded-lg" src="https://www.youtube.com/embed/d5Pj-aGjvHQ" title="🙏 Thank You to All Our Clients ✈️ For the Amazing Journeys &amp; Unforgettable Travel Experiences 🌍" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    </section>
</template>