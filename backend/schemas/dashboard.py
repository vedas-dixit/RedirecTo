from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class URLData(BaseModel):
    id: str
    shortUrl: str
    destination: str
    clicks: int
    ttl: str
    status: str
    protected: bool
    createdAt: str


class RecentClick(BaseModel):
    time: str
    country: str
    flag: str


class SummaryData(BaseModel):
    totalUrls: int
    totalClicks: int
    protectedUrls: int
    recentClick: Optional[RecentClick]


class ClickData(BaseModel):
    day: str
    clicks: int


class CountryData(BaseModel):
    country: str
    clicks: int
    color: str


class Activity(BaseModel):
    id: str
    shortUrl: str
    country: str
    flag: str
    time: str
