import { withRouter } from 'react-router-dom';

import { compose, withHandlers, lifecycle } from 'recompose';

import Prompt from '../atoms/prompt';

const enhance = compose(
  withRouter,
  withHandlers(({ history }) => {
    let when;
    let unblock;
    let target;
    let canRedirect = false;
    let openPrompt;
    let redirect = () => {
      canRedirect = true;
      unblock();
      history.replace(target);
    };

    return {
      setBlock: ({ history }) => () => {
        unblock && unblock();
        
        unblock = history.block(targetLocation => {
          if(when){
            target = targetLocation;
            openPrompt();

            return canRedirect;
          }
          else{
            unblock && unblock();
            return true;
          }
        });
      },
      setWhen: () => (w) => ( when = w ),
      callback: () => () => redirect(),
      onRef: () => (r) => (openPrompt = r)
    };
  }),
  lifecycle({
    componentDidMount(){
      this.props.setWhen(typeof this.props.when !== 'undefined' ? this.props.when : true);
      this.props.setBlock();
    },
    componentWillReceiveProps(nextProps){
      this.props.setWhen(typeof nextProps.when !== 'undefined' ? nextProps.when : true);
      this.props.setBlock();
    }
  })
);

export default enhance(Prompt);