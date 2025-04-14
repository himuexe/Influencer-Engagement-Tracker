
// Mock data for dashboard
export const mockDashboardData = {
  metrics: {
    engagement: {
      value: 4.7,
      change: 12.6
    },
    impressions: {
      value: 2350000,
      change: 8.3
    },
    roi: {
      value: 3.2,
      change: 15.8
    },
    conversions: {
      value: 1260,
      change: 5.4
    },
    clicks: {
      value: 28500,
      change: 7.2
    }
  },
  campaigns: {
    active: 6,
    completed: 12,
    draft: 3
  },
  platformBreakdown: [
    {
      name: "instagram",
      followers: 12500,
      engagement: 3.8,
      posts: 78
    },
    {
      name: "twitter",
      followers: 8200,
      engagement: 2.1,
      posts: 122
    },
    {
      name: "youtube",
      followers: 5300,
      engagement: 4.6,
      posts: 36
    }
  ],
  recentActivities: [
    {
      id: "act1",
      action: "Campaign Started",
      platform: "instagram",
      time: "2 hours ago",
      details: "Summer Collection Launch campaign started"
    },
    {
      id: "act2",
      action: "Post Published",
      platform: "twitter",
      time: "5 hours ago",
      details: "Weekly update thread published with 8 tweets"
    },
    {
      id: "act3",
      action: "Influencer Onboarded",
      platform: "youtube",
      time: "1 day ago",
      details: "Tech reviewer Maria J. (1.2M subscribers) onboarded"
    },
    {
      id: "act4",
      action: "Campaign Completed",
      platform: "instagram",
      time: "2 days ago",
      details: "Spring Flash Sale campaign ended with 320% ROI"
    }
  ],
  topInfluencers: [
    {
      id: "inf1",
      name: "Alex Morgan",
      handle: "alexlifestyle",
      platform: "instagram",
      followers: 850000,
      engagement: 5.2,
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: "inf2",
      name: "Zack Chen",
      handle: "zacktech",
      platform: "youtube",
      followers: 1250000,
      engagement: 4.8,
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: "inf3",
      name: "Sophia Lee",
      handle: "sophiatrends",
      platform: "twitter",
      followers: 620000,
      engagement: 3.9,
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: "inf4",
      name: "Daniel Carter",
      handle: "dancarter",
      platform: "instagram",
      followers: 780000,
      engagement: 4.3,
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    }
  ],
  dailyMetrics: [
    { date: "2023-05-01", engagement: 4.2, impressions: 78000, clicks: 2100 },
    { date: "2023-05-02", engagement: 4.5, impressions: 82000, clicks: 2300 },
    { date: "2023-05-03", engagement: 4.1, impressions: 75000, clicks: 2000 },
    { date: "2023-05-04", engagement: 4.8, impressions: 88000, clicks: 2600 },
    { date: "2023-05-05", engagement: 5.2, impressions: 95000, clicks: 2800 },
    { date: "2023-05-06", engagement: 4.9, impressions: 92000, clicks: 2700 },
    { date: "2023-05-07", engagement: 5.0, impressions: 93000, clicks: 2750 }
  ]
};

// Mock campaigns data
export const mockCampaignsData = [
  {
    id: "camp_1",
    name: "Summer Collection Launch",
    startDate: "2023-05-15",
    endDate: "2023-06-15",
    status: "active",
    budget: 15000,
    platforms: ["instagram", "twitter"],
    influencers: 8,
    engagement: 25600,
    impressions: 450000
  },
  {
    id: "camp_2",
    name: "Product Review Series",
    startDate: "2023-04-10",
    endDate: "2023-05-10",
    status: "completed",
    budget: 12000,
    platforms: ["youtube"],
    influencers: 5,
    engagement: 18700,
    impressions: 380000
  },
  {
    id: "camp_3",
    name: "Back to School",
    startDate: "2023-07-01",
    endDate: null,
    status: "draft",
    budget: 20000,
    platforms: ["instagram", "twitter", "youtube"],
    influencers: 12,
    engagement: 0,
    impressions: 0
  },
  {
    id: "camp_4",
    name: "Holiday Special",
    startDate: "2023-11-15",
    endDate: "2023-12-25",
    status: "draft",
    budget: 25000,
    platforms: ["instagram", "youtube"],
    influencers: 15,
    engagement: 0,
    impressions: 0
  },
  {
    id: "camp_5",
    name: "Brand Awareness",
    startDate: "2023-03-01",
    endDate: "2023-04-30",
    status: "completed",
    budget: 18000,
    platforms: ["twitter", "youtube"],
    influencers: 10,
    engagement: 31200,
    impressions: 520000
  },
  {
    id: "camp_6",
    name: "New Product Launch",
    startDate: "2023-05-20",
    endDate: "2023-06-20",
    status: "active",
    budget: 22000,
    platforms: ["instagram", "youtube"],
    influencers: 12,
    engagement: 19800,
    impressions: 410000
  }
];

// Mock campaign details data
export const mockCampaignDetailsData = [
  {
    campaignId: "camp_1",
    data: {
      platformBreakdown: [
        { name: "instagram", percentage: 65, value: 16640 },
        { name: "twitter", percentage: 35, value: 8960 }
      ],
      dailyEngagement: [
        { date: "2023-05-15", value: 820 },
        { date: "2023-05-16", value: 920 },
        { date: "2023-05-17", value: 1050 },
        { date: "2023-05-18", value: 1150 },
        { date: "2023-05-19", value: 1300 },
        { date: "2023-05-20", value: 1450 },
        { date: "2023-05-21", value: 1580 }
      ],
      topPosts: [
        {
          id: "post_1",
          influencer: "Alex Morgan",
          content: "Check out this amazing summer collection! Perfect for beach days... #summerstyle",
          platform: "instagram",
          engagement: 3200,
          date: "2023-05-16"
        },
        {
          id: "post_2",
          influencer: "Sophia Lee",
          content: "A thread on why this summer collection is a game changer for sustainable fashion...",
          platform: "twitter",
          engagement: 2800,
          date: "2023-05-17"
        },
        {
          id: "post_3",
          influencer: "Daniel Carter",
          content: "Styling the new summer collection pieces in 3 different ways! #fashiontips",
          platform: "instagram",
          engagement: 2500,
          date: "2023-05-18"
        }
      ]
    }
  },
  {
    campaignId: "camp_2",
    data: {
      platformBreakdown: [
        { name: "youtube", percentage: 100, value: 18700 }
      ],
      dailyEngagement: [
        { date: "2023-04-10", value: 580 },
        { date: "2023-04-11", value: 650 },
        { date: "2023-04-12", value: 720 },
        { date: "2023-04-13", value: 690 },
        { date: "2023-04-14", value: 780 },
        { date: "2023-04-15", value: 850 },
        { date: "2023-04-16", value: 920 }
      ],
      topPosts: [
        {
          id: "post_4",
          influencer: "Zack Chen",
          content: "HONEST REVIEW: I tested this product for a week and here's what happened...",
          platform: "youtube",
          engagement: 4200,
          date: "2023-04-12"
        },
        {
          id: "post_5",
          influencer: "Tech Review Channel",
          content: "Comparing the new product with top competitors - surprising results!",
          platform: "youtube",
          engagement: 3800,
          date: "2023-04-14"
        },
        {
          id: "post_6",
          influencer: "Sarah's Gadget World",
          content: "Features and specs deep dive: Is this product worth the hype?",
          platform: "youtube",
          engagement: 3500,
          date: "2023-04-15"
        }
      ]
    }
  },
  {
    campaignId: "camp_5",
    data: {
      platformBreakdown: [
        { name: "twitter", percentage: 40, value: 12480 },
        { name: "youtube", percentage: 60, value: 18720 }
      ],
      dailyEngagement: [
        { date: "2023-03-01", value: 950 },
        { date: "2023-03-05", value: 1050 },
        { date: "2023-03-10", value: 1200 },
        { date: "2023-03-15", value: 1320 },
        { date: "2023-03-20", value: 1450 },
        { date: "2023-03-25", value: 1580 },
        { date: "2023-03-30", value: 1720 }
      ],
      topPosts: [
        {
          id: "post_7",
          influencer: "Sophia Lee",
          content: "Why this brand is changing the game in their industry - a thread on innovation...",
          platform: "twitter",
          engagement: 3900,
          date: "2023-03-10"
        },
        {
          id: "post_8",
          influencer: "Zack Chen",
          content: "I challenged myself to use only this brand for a month - here's what happened",
          platform: "youtube",
          engagement: 4500,
          date: "2023-03-15"
        },
        {
          id: "post_9",
          influencer: "Marketing Insights",
          content: "Case study: How this brand is building authentic community engagement",
          platform: "twitter",
          engagement: 3400,
          date: "2023-03-20"
        }
      ]
    }
  },
  {
    campaignId: "camp_6",
    data: {
      platformBreakdown: [
        { name: "instagram", percentage: 70, value: 13860 },
        { name: "youtube", percentage: 30, value: 5940 }
      ],
      dailyEngagement: [
        { date: "2023-05-20", value: 720 },
        { date: "2023-05-21", value: 840 },
        { date: "2023-05-22", value: 910 },
        { date: "2023-05-23", value: 980 },
        { date: "2023-05-24", value: 1050 },
        { date: "2023-05-25", value: 1120 },
        { date: "2023-05-26", value: 1200 }
      ],
      topPosts: [
        {
          id: "post_10",
          influencer: "Alex Morgan",
          content: "First impressions of this revolutionary new product! #gamechanger",
          platform: "instagram",
          engagement: 2800,
          date: "2023-05-21"
        },
        {
          id: "post_11",
          influencer: "Product Review Channel",
          content: "UNBOXING & FIRST TEST: The most anticipated product of the year",
          platform: "youtube",
          engagement: 3200,
          date: "2023-05-22"
        },
        {
          id: "post_12",
          influencer: "Daniel Carter",
          content: "10 ways this new product has improved my daily routine #productivity",
          platform: "instagram",
          engagement: 2600,
          date: "2023-05-23"
        }
      ]
    }
  }
];
