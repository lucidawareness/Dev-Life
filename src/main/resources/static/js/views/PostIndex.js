export default function PostIndex(props) {
	//language=HTML
	return `
        <header>
            <h1>Posts Page</h1>
        </header>
        <main>
            <div id="posts-container">
                ${props.posts.map(post =>

                        `
           <h3>${post.title}</h3> 
           <p>${post.content}</p>
        `)
                        .join('')}
            </div>
			<div class="form-div">
                <form>
                    <label for="postTitle">Post Title:</label><br>
                    <input type="text" id="postTitle" name="postTitle"><br>
                    <label for="content">Content:</label><br>
                    <input type="text" id="content" name="content">
                    <input type="submit" value="Submit">
                </form>
			</div>
        </main>
	`;
}