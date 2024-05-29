// 해야할일
/*
    11.5 게시글 관리 기능 구현
    11.6 댓글 관리 기능 구현
    11.7 통계 기능 구현
*/
import Post from "../model/Post"
import Comment from "../model/Comment";
import Admin from "../model/Admin";

export const postPostController = async (req, res) => {
    const { userId, categoryId, title, content } = req.body;
    try {
        const result = await Post.insertPost(userId, categoryId, title, content);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('게시글 생성 중 오류 발생: ' + err.message);
    }
};

export const deletePostController = async (req, res) => {
    const postId = req.params.id;
    const userId = req.body.userId;
    try {
        const result = await Admin.checkAdmin(userId);
        if(result.length > 0) {
            const result = await Post.deletePost(postId);
            res.status(200).json(result);
        }
        else{
            res.status(403).send('삭제할 권한이 없습니다.');   
        }
        
    } catch (err) {
        res.status(500).send('게시글 삭제 중 오류 발생: ' + err.message);
    }
};

export const deleteCommentController = async (req, res) => {
    const userId = req.body.userId;
    const commentId = req.params.id;

    try {
        const result = await Admin.checkAdmin(userId);
        if(result.length > 0) {
            const result = await Comment.deleteComment(commentId);
            res.status(200).json(result);
        }
        else{
            res.status(403).send('삭제할 권한이 없습니다.');
        }
    } catch (err) {
        res.status(500).send('댓글 삭제 중 오류 발생: ' + err.message);
    }
};

export const getTotalVisitController = async (req, res) => {
    try {
        const result = await Admin.getTotalVisiter();
        res.status(200).json(result);
    } catch (err) {
        res.status(500).send('방문자 수 조회 중 오류 발생: ' + err.message);
    }

};
export const getTodayVisitController = async (req, res) => {
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD 형식의 현재 날짜
    try {
        const result = await Admin.getCountVisiter(today);
        res.status(200).json(result);
    }
    catch (err) {
        res.status(500).send('방문자 수 조회 중 오류 발생: ' + err.message);
    }
};