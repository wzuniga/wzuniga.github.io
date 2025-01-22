import BlogSchema from "../../BlogSchema/BlogSchema";
import World from "./World";

function Post1() {

    return (
        <BlogSchema
            pageDesc="World"
            charDiv={<World/>}
            description={<>test</>}
        />
    )
}

export {Post1 as VarietyPost1}
