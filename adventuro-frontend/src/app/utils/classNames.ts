import {withNaming} from '@bem-react/classname';
import {classnames as classNames} from '@bem-react/classnames';

export const cn = withNaming({n: 'mla-', e: '__', m: '--', v: '--'});

const className = cn;
export {className, classNames};

export default cn;
