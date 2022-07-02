/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.resetAndCreateDefaultUsers({ creatorUsername: 'root', creatorName: 'test', creatorPassword: 'password', otherUsername: 'other', otherName: 'test other', otherPassword: 'password' })
  })

  it('Login form is shown', function() {
    cy.get('h2').contains('blogs')
    cy.contains('username')
    cy.contains('password')
    cy.get('input[name="Username"]').should('exist')
    cy.get('input[name="Password"]').should('exist')
    cy.get('button').contains('login')
  })

  describe('Login', function() {
    it('Succeeds with correct credentials', function() {
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('password')
      cy.get('button').click()

      cy.contains('test logged in')
      cy.get('button').contains('logout')
      cy.get('button').contains('new note')
    })

    it('fails with wrong credentials', function() {
      cy.get('input[name="Username"]').type('root')
      cy.get('input[name="Password"]').type('root')
      cy.get('button').click()

      cy.get('.notification').contains('invalid username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')
      cy.get('.notification').should('have.css', 'background-color', 'rgb(211, 211, 211)')

      cy.get('input[name="Username"]').should('be.empty')
      cy.get('input[name="Password"]').should('be.empty')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'password' })
    })

    it('a blog can be created', function() {
      cy.get('button:contains("new note")').click()
      cy.get('input[name="title"]').type('test title')
      cy.get('input[name="author"]').type('test author')
      cy.get('input[name="url"]').type('test url')
      cy.get('button:contains("create")').click()

      cy.get('.notification').contains('a new blog test title by test author added')
      cy.get('.notification').should('have.css', 'color', 'rgb(0, 128, 0)')
      cy.get('.notification').should('have.css', 'border-style', 'solid')
      cy.get('.notification').should('have.css', 'background-color', 'rgb(211, 211, 211)')

      cy.get('.blogOverview').contains('test title test author')
    })

    describe('When there is an existing blog', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'test title', author: 'test author', url: 'test url' })
      })

      it('logged in user can like a blog', function() {
        cy.get('.blogOverview').find('button:contains("Show")').click()
        cy.get('.blogDetails').find('button:contains("like")').click()
        cy.get('.blogDetails').contains('likes 1')
      })

      it('creator can delete a blog', function() {
        cy.get('.blogOverview').find('button:contains("Show")').click()
        cy.get('.blogDetails').find('button:contains("remove")').click()

        cy.get('.blogOverview').should('not.exist')
        cy.get('.blogDetails').should('not.exist')
      })

      it('user cannot remove a blog that they did not create', function() {
        cy.wait(5005)
        cy.get('button:contains("logout")').click()

        cy.get('input[name="Username"]').type('other')
        cy.get('input[name="Password"]').type('password')
        cy.get('button').click()

        cy.get('.blogOverview').find('button:contains("Show")').click()
        cy.get('.blogDetails').find('button:contains("remove")').should('not.exist')
      })
    })

    describe('When there are multiple blogs with varying levels of likes', function() {
      beforeEach(function() {
        cy.createBlog({ title: 'The title with the second most likes', author: 'test author', url: 'test url', likes: '2' })
        cy.createBlog({ title: 'The title with the most likes', author: 'test author', url: 'test url', likes: '3' })
        cy.createBlog({ title: 'The title with the third most likes', author: 'test author', url: 'test url', likes: '1' })
      })

      it('blogs are ordered by number of likes', function() {
        cy.get('.blogOverview').eq(0).should('contain', 'The title with the most likes')
        cy.get('.blogOverview').eq(1).should('contain', 'The title with the second most likes')
        cy.get('.blogOverview').eq(2).should('contain', 'The title with the third most likes')
      })
    })
  })
})