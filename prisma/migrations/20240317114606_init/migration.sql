-- CreateTable
CREATE TABLE "album" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "artist_id" UUID,
    "year" INTEGER NOT NULL,

    CONSTRAINT "album_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "artist" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "grammy" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "artist_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "track" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "artist_id" UUID,
    "album_id" UUID,
    "duration" INTEGER NOT NULL,

    CONSTRAINT "track_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL,
    "login" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "version" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fav_album" (
    "album_id" UUID NOT NULL,

    CONSTRAINT "fav_album_pkey" PRIMARY KEY ("album_id")
);

-- CreateTable
CREATE TABLE "fav_artist" (
    "artist_id" UUID NOT NULL,

    CONSTRAINT "fav_artist_pkey" PRIMARY KEY ("artist_id")
);

-- CreateTable
CREATE TABLE "fav_track" (
    "track_id" UUID NOT NULL,

    CONSTRAINT "fav_track_pkey" PRIMARY KEY ("track_id")
);

-- AddForeignKey
ALTER TABLE "album" ADD CONSTRAINT "album_artist_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "track" ADD CONSTRAINT "track_artist_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fav_album" ADD CONSTRAINT "fav_album_album_id_fk" FOREIGN KEY ("album_id") REFERENCES "album"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fav_artist" ADD CONSTRAINT "fav_artist_artist_id_fk" FOREIGN KEY ("artist_id") REFERENCES "artist"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "fav_track" ADD CONSTRAINT "fav_track_track_id_fk" FOREIGN KEY ("track_id") REFERENCES "track"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
