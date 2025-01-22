import Char from "./Char";
import BlogSchema from "../../BlogSchema/BlogSchema";

function Post1() {

    return (
        <BlogSchema
            pageDesc="Post1"
            charDiv={
                <Char
                    widthPercentage={50}
                    heightPercentage={50}
                />
            }
            description={<></>}
        />
    )
}

export {Post1 as PoliticPost1}
