from sqlalchemy import Column, ForeignKey, String, Boolean, Integer, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from backend.database.db import Base
import uuid
from datetime import datetime

class URL(Base):
    __tablename__ = "urls"

    id = Column(UUID(as_uuid=True), primary_key=True, index=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey("users.id", ondelete="CASCADE"))
    short_code = Column(String, unique=True, nullable=False)
    destination = Column(String, nullable=False)
    is_protected = Column(Boolean, default=False)
    expires_at = Column(DateTime, nullable=True)
    click_limit = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.now)

    user = relationship("User", backref="urls")