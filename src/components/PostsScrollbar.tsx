// PostsScrollbar.tsx
// A scrollbar for listing posts.

// Import localization hook.
import { useTranslation } from 'react-i18next';

// Import React Bootstrap components.
import { ListGroup } from 'react-bootstrap';

// Import types.
import type { PostScrollbarProps } from '../models/PostsTypes';

export const PostsScrollbar = ( props: PostScrollbarProps ) =>
{
    const { t } = useTranslation();

    // Handle empty post list
    if ( !props.postList || props.postList.length === 0 ) return null;

    return (
        <ListGroup className='posts-scrollbar'>
            {
                props.postList.map( ( post, index ) =>
                    (
                        <ListGroup.Item
                            action
                            key={ index }
                            className='post my-2 border-0 px-3 py-3'
                            active={ index === props.selectedPost }
                            onClick={ () => props.onPostSelect?.( index ) }
                        >
                            <div className='d-flex flex-column gap-1 text-break'>
                                <span className='fw-semibold'>{ post.title }</span>
                                <small className='text-muted'>{ t( 'posts.timeAgo', { time: post.datetime.time, unit: post.datetime.unit } ) }</small>
                            </div>
                        </ListGroup.Item>
                    )
                )
            }
        </ListGroup>
    )
}
