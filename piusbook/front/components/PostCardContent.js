import React from 'react';
import propTypes from 'prop-types';
import Link from 'next/link';
const PostCardContent = ({ postData }) => {
	return (
		<div>
			{/* {postData} */}
			{postData.split(/(#[^\s#]+)/gi).map((item, idx) => {
				// console.log(item);
				// return item;
				if (item !== '' && item[0] === '#') {
					return (
						<Link key={idx} href={`/hashtag/${item.slice(1)}`}>
							<a>{item}</a>
						</Link>
					);
				} else {
					return item;
				}
			})}
		</div>
	);
};

PostCardContent.propTypes = {
	postData: propTypes.string,
};

export default PostCardContent;
