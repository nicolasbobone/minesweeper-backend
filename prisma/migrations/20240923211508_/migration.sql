-- CreateTable
CREATE TABLE "setups" (
    "id" INTEGER NOT NULL DEFAULT 1,
    "rows" INTEGER NOT NULL DEFAULT 10,
    "columns" INTEGER NOT NULL DEFAULT 10,
    "mines_count" INTEGER NOT NULL DEFAULT 10,
    "difficulty" "GameDifficulty" NOT NULL DEFAULT 'EASY',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "setups_pkey" PRIMARY KEY ("id")
);
