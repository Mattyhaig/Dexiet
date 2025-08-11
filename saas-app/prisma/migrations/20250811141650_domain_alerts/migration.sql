-- CreateTable
CREATE TABLE "Domain" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "tld" TEXT,
    "length" INTEGER NOT NULL,
    "score" REAL NOT NULL DEFAULT 0,
    "backlinks" INTEGER,
    "traffic" INTEGER,
    "listedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "data" JSONB
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "query" TEXT,
    "minScore" REAL,
    "tld" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Domain_name_key" ON "Domain"("name");

-- CreateIndex
CREATE INDEX "Domain_score_idx" ON "Domain"("score");

-- CreateIndex
CREATE INDEX "Domain_tld_idx" ON "Domain"("tld");

-- CreateIndex
CREATE INDEX "Alert_userId_idx" ON "Alert"("userId");
