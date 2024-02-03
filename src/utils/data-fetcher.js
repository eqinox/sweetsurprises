export const getBackgroundImageUrl = async () => {
    const backgroundImageId = 1;

    try {
        const backgroundResponse = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}/api/backgrounds/${backgroundImageId}?populate=*`);

        const backgroundData = await backgroundResponse.json();
        const imageUrl = process.env.NEXT_PUBLIC_DB_HOST + backgroundData.data.attributes.image.data.attributes.url;
        
        return imageUrl;

    } catch (error) {
        console.log(error);
    }
}