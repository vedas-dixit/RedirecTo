from sqlalchemy import Column, ForeignKey, String, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from backend.database.db import Base
import uuid
from datetime import datetime

class Click(Base):
    __tablename__ = "clicks"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    url_id = Column(UUID(as_uuid=True), ForeignKey("urls.id", ondelete="CASCADE"))
    country = Column(String, nullable=True)
    flag = Column(String, nullable=True)
    timestamp = Column(DateTime, default=datetime.now)

    url = relationship("URL", backref="clicks")