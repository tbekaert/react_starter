import React from 'react';

import { compose } from 'recompose';

import Hero from '../../components/atoms/hero';
import Subheader from '../../components/molecules/subheader';
import AlertBox from '../../components/atoms/alertBox';
import LazyImage from '../../components/atoms/lazyImage';
import Progress from '../../components/atoms/progress';
import Popin from '../../components/atoms/popin';
import Form from '../../components/atoms/form';
import Input from '../../components/atoms/input';
import ConfirmRouteChange from '../../components/HOC/confirmRouteChange';

import imgUrl from '../../utils/imgUrl';

import './index.css';

import heroImage from '../../assets/images/hero.jpg';

let colorStyle = {
  width: '10rem',
  height: '10rem',
  margin: '2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};


const Styleguide = props => {
  let openPopin = undefined;

  return (
    <div className="sg size-100p flex-auto">
      <Hero url={ heroImage }>
        <div className="row mgb-1_5">
          <div className="column-12 no-white">
            <h1 className="text-white no-margin mgb-1">Styleguide</h1>
          </div>
        </div>
      </Hero>
      <Subheader className="mgb-2" title="Titre" subtitle="Sous-titre" />
      <section className="row">
        <ConfirmRouteChange title="Êtes-vous sur de vouloir quitter cette page ?" ok_label="Oui" nok_label="Non">
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce vel nibh viverra, finibus dui at, sodales nunc. Nunc accumsan consectetur mi eleifend pellentesque.</p>
        </ConfirmRouteChange>
        <div className="column-12">
          <div>
            <h1>Text de niveau 1</h1>
            <h2>Text de niveau 2</h2>
            <h3>Text de niveau 3</h3>
            <p>Lorem Ipsum <strong>dolor</strong> sir amet.</p>
            <p className="small">Lorem Ipsum dolor sir amet.</p>
            <p className="small uppercase">Divider</p>
            <p className="x-small uppercase">Lorem Ipsum dolor sir amet.</p>
          </div>
        </div>
        <div className="column-12">
          <div className="flex layout-row layout-wrap">
            <div className="bg-primary-light round" style={ colorStyle }>Primary-light</div>
            <div className="bg-primary round text-primary-light" style={ colorStyle }>Primary</div>
            <div className="bg-primary-dark round text-primary-light" style={ colorStyle }>Primary-dark</div>
          </div>
          <div className="flex layout-row layout-wrap">
            <div className="bg-orange round" style={ colorStyle }>orange</div>
            <div className="bg-yellow round" style={ colorStyle }>yellow</div>
            <div className="bg-coral round" style={ colorStyle }>coral</div>
            <div className="bg-pink round" style={ colorStyle }>pink</div>
            <div className="bg-purple round text-white" style={ colorStyle }>purple</div>
            <div className="bg-teal round text-white" style={ colorStyle }>teal</div>
            <div className="bg-turquoise round" style={ colorStyle }>turquoise</div>
          </div>
          <div className="flex layout-row layout-wrap">
            <div className="bg-gray-light round" style={ colorStyle }>gray-light</div>
            <div className="bg-gray round" style={ colorStyle }>gray</div>
            <div className="bg-gray-dark round text-white" style={ colorStyle }>gray-dark</div>
            <div className="bg-gray-darker round text-white" style={ colorStyle }>gray-darker</div>
          </div>
          <div className="flex layout-row layout-wrap">
            <div className="bg-alert round text-white" style={ colorStyle }>alert</div>
            <div className="bg-success round text-white" style={ colorStyle }>success</div>
          </div>
        </div>
        <div className="column-12">
          <div className="flex layout-column align-center-center size-100">
            <span className="button outline small with-icon mgb-1">
              <svg className="text-coral"><use xlinkHref="#icon-book" /></svg>
              <span>Button primary</span>
            </span>

            <span className="button primary large with-icon">
              <svg className="text-white"><use xlinkHref="#icon-chat" /></svg>
              <span>Button primary large</span>
            </span>
          </div>
          
          <div className="flex align-spacebetween-start size-100">
            <div className="flex layout-column align-start-center size-33p">
              <span className="button primary mgb-1">
                Button primary
              </span>
              <a href="#test" className="button primary light mgb-1">
                Button light
              </a>
              <button type="submit" className="button outline">
                Button outline
              </button>
            </div>
            <div className="flex layout-column align-start-center size-33p">
              <input type="submit" className="button primary mgb-1 disabled" value="Primary Disabled" />
              <a href="#test" className="button primary light mgb-1 disabled">
                Primary light disabled
              </a>
              <button type="submit" className="button outline disabled">
                Primary outline disabled
              </button>
            </div>
            <div className="flex layout-column align-start-center size-33p">
              <span className="button primary small mgb-1">
                Button primary small
              </span>
              <span className="button primary mgb-1">
                Button primary normal
              </span>
              <span className="button primary large">
                Button primary large
              </span>
            </div>
          </div>
        </div>
        <div className="column-12">
          <div className="flex flex-wrap align-start-center">
            <svg className="text-orange w-4 h-4 mgr-1"><use xlinkHref="#icon-arrow" /></svg>
            <svg className="text-yellow w-4 h-4 mgr-1"><use xlinkHref="#icon-awards" /></svg>
            <svg className="text-pink w-4 h-4 mgr-1"><use xlinkHref="#icon-bookmark" /></svg>
            <svg className="text-purple w-4 h-4 mgr-1"><use xlinkHref="#icon-chat" /></svg>
            <svg className="text-teal w-4 h-4 mgr-1"><use xlinkHref="#icon-checkmark" /></svg>
            <svg className="text-turquoise w-4 h-4 mgr-1"><use xlinkHref="#icon-chevron" /></svg>
            <svg className="text-primary w-4 h-4 mgr-1"><use xlinkHref="#icon-pencil" /></svg>
            <svg className="text-alert w-4 h-4 mgr-1"><use xlinkHref="#icon-play" /></svg>
            <svg className="text-gray w-4 h-4 mgr-1"><use xlinkHref="#icon-star" /></svg>
            <div className="icon-bg arrow"></div>
          </div>
        </div>

        <div className="column-12">
          <div className="flex align-spacebetween-center size-100p">
            <div className="pgh-1 size-50p flex align-center-center">
              <Progress type="round" value={ 75 } strokeWidth={ 8 } baseWidth={ 60 } />
            </div>
            <div className="pgh-1 size-50p flex align-center-center">
              <Progress type="linear" value={ 30 } className="size-75p" />
            </div>
          </div>
        </div>
        <div className="column-12">
          <div>
            <AlertBox type="success" message="Notification de succés" />
          </div>
          <div>
            <AlertBox type="alert" message="Notification d'erreur" />
          </div>
        </div>
        <div className="column-12">
          <div className="flex size-100p">
            <div className="size-50p pgr-1 bdr-1-gray-lighter">
              <Input
                type="text"
                name="input-text"
                label="Champs texte"
                placeholder="Votre nom d'utilisateur"
              />
              <Input
                type="text"
                name="input-text-required"
                label="Champs texte requis"
                required="Ce champs est requis"
                placeholder="Votre nom d'utilisateur"
              />
              <Input
                type="text"
                name="input-text-preenter"
                label="Champs texte pré-rempli"
                defaultValue="Thomas"
                placeholder="Votre nom d'utilisateur"
              />
              <Input
                type="email"
                name="input-email-required"
                label="Champs email requis"
                required="Ce champs est requis"
                placeholder="Votre adresse email"
              />
              <textarea
                placeholder="Votre message"
                className="mgb-1"
              >
              </textarea>
              <label>
                <span>Veuillez faire un choix</span>
                <select name="select-choice" defaultValue="-1">
                  <option disabled value="-1">-</option>
                  <option value="1">Choix 1</option>
                  <option value="2">Choix 2</option>
                  <option value="3">Choix 3</option>
                  <option value="4">Choix 4</option>
                  <option value="5">Choix 5</option>
                </select>
              </label>
              <div className="flex flex-wrap">
                <input type="checkbox" id="checkbox-1"/>
                <label htmlFor="checkbox-1" className="mgr-1">
                  <svg className="w-2 h-2"><use xlinkHref="#icon-check" /></svg>
                  1
                </label>
                <input type="checkbox" id="checkbox-2" defaultChecked/>
                <label htmlFor="checkbox-2" className="mgr-1">
                  <svg className="w-2 h-2"><use xlinkHref="#icon-check" /></svg>
                  1
                </label>
                <input type="checkbox" id="checkbox-3" disabled/>
                <label htmlFor="checkbox-3" className="mgr-1">
                  <svg className="w-2 h-2"><use xlinkHref="#icon-check" /></svg>
                  1
                </label>
                <input type="checkbox" id="checkbox-4"/>
                <label htmlFor="checkbox-4" className="mgr-1">
                  <svg className="w-2 h-2"><use xlinkHref="#icon-check" /></svg>
                  1
                </label>
              </div>
            </div>
            <div className="size-50p pgl-1">
              <Input
                type="password"
                name="input-password"
                label="Champs mot de passe"
                placeholder="Votre mot de passe"
              />
              <Input
                type="password"
                name="input-password-disabled"
                label="Champs mot de passe désactivé"
                disabled={ true }
                placeholder="Votre mot de passe"
              />
              <Input
                type="email"
                name="input-email"
                label="Champs email"
                placeholder="Votre adresse email"
              />
              <Input
                type="tel"
                name="input-tel"
                label="Champs numéro de téléphone"
                placeholder="Votre numéro téléphone"
              />
              <textarea
                placeholder="Votre message"
                className="mgb-1"
                disabled={ true }
              >
              </textarea>
              <label>
                <span>Veuillez faire un choix</span>
                <select name="select-choice" defaultValue="3" disabled={ true }>
                  <option disabled value="-1">-</option>
                  <option value="1">Choix 1</option>
                  <option value="2">Choix 2</option>
                  <option value="3">Choix 3</option>
                  <option value="4">Choix 4</option>
                  <option value="5">Choix 5</option>
                </select>
              </label>
              <div className="flex flex-wrap">
                <input type="radio" name="radio" id="radio-1"/>
                <label htmlFor="radio-1" className="mgr-1">1</label>
                <input type="radio" name="radio" id="radio-2" defaultChecked/>
                <label htmlFor="radio-2" className="mgr-1">1</label>
                <input type="radio" name="radio" id="radio-3" disabled/>
                <label htmlFor="radio-3" className="mgr-1">1</label>
                <input type="radio" name="radio" id="radio-4"/>
                <label htmlFor="radio-4" className="mgr-1">1</label>
              </div>
            </div>
          </div>
          <div className="flex size-100p">
            <div className="size-50p pgr-1 bdr-1-gray-lighter">
              <div className="pg-1">
                <Input
                  type="text"
                  name="query"
                  label=""
                  className="mgb-0"
                  placeholder="Rechercher"
                  svg="arrow"
                ></Input>
              </div>
            </div>
            <div className="size-50p pgl-1">
              <div className="bg-primary pg-1">
                <Input
                  type="text"
                  name="query"
                  label=""
                  className="dark mgb-0"
                  placeholder="Rechercher"
                  svg="chevron"
                ></Input>
              </div>
            </div>
          </div>
          <div className="flex align-center-center size-100p">
            <div className="size-50p">
              <Form callback={ r => { alert(`Submit successfull ! ${Object.keys(r).reduce((t, k) => [...t, `${k}: ${r[k]}`], []).join(' / ')}`); } } className="flex layout-column size-90">
                <Input
                  type="text"
                  name="form-username"
                  label="Username"
                  required="This field is required"
                ></Input>
                <Input
                  type="password"
                  name="form-password"
                  label="Password"
                  required="This field is required"
                ></Input>
                <button type="submit" className="button primary light">Submit</button>
              </Form>
            </div>
          </div>
        </div>
        <div className="column-12">
          <LazyImage src={ `${ imgUrl({ fileName: heroImage, width: '400', height: '268' }) }?office` } alt="Hero image lazy loading" width={ 400 } height={ 268 } />
        </div>
        <div className="column-12 align-center-center">
          <div className="pgv-1 flex align-center-center">
            <Popin forceOpen={ false } onRef={ r => openPopin = r }>
              <h2>Titre de test</h2>
              <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
              <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
              <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
              <h3>Titre secondaraire</h3>
              <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
              <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
              <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
              <h3>Titre secondaraire</h3>
              <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
              <p className="">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
              <p className="no-margin">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dignissimos suscipit quis quaerat quisquam earum quos illum perferendis sequi reprehenderit. Molestiae rem ratione numquam commodi quidem sint, porro tempore! Quae, odit.</p>
            </Popin>
            <span className="button primary" onClick={ () => { openPopin(); } }>
              Ouvrir la popin
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

Styleguide.propTypes = {
  
};

const enhance = compose(
);

export default enhance(Styleguide);
