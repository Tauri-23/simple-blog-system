import { Input } from "antd";
import { useState } from "react";
import { LiaCommentDots, LiaHeart, LiaHeartSolid } from "react-icons/lia";

export default function BlogBox() {
    const { TextArea } = Input;
    const [isLiked, setIsLiked] = useState<boolean>(false)



    /**
     * Render
     */
    return(
        <div className="blog-box1">
            {/* Header */}
            <div className="blog-box-header">
                <div className="blog-box-pfp">A</div>
                <div>
                    <div className="text-m2 fw-bold">Airich Diawan</div>
                    <div className="text-m3">1 min ago</div>
                </div>
            </div>

            {/* Body */}
            <div className="blog-box-body">
                <div className="blog-box-body-caption">
                    Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
                </div>

                <div className="blog-box-body-image">
                </div>
            </div>

            {/* Footer */}
            <div className="blog-box-footer">
                <div className="d-flex gap4 align-items-center mar-bottom-3">
                    {isLiked? <LiaHeartSolid size={30} color="red"/> : <LiaHeart size={30}/>}
                    <LiaCommentDots size={30}/>
                </div>
                <div className="d-flex mar-bottom-3">
                    <span>1000 Likes</span>
                </div>

                {/* If it has comment */}
                <div className="text-m3 text-underlined mar-bottom-3">View 10 comments</div>

                <TextArea
                    placeholder="Add a comment"
                    variant="borderless"
                    autoSize={{ minRows: 1, maxRows: 6 }}
                />
            </div>
        </div>
    )
}