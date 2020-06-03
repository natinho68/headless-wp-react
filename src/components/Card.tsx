import { Button, Card } from 'react-bootstrap'
import React from 'react'
import { Link } from '@reach/router'

interface CardProps {
  ID: string
  title: string
  excerpt: string
  slug: string
  thumbnail: string
}

export const CardItem: React.FC<CardProps> = ({ title, thumbnail, excerpt, ID, slug }: CardProps) => (
  <Card key={ID}>
    <Link to={`/${slug}`}>
      <Card.Img variant="top" src={thumbnail} />
    </Link>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text dangerouslySetInnerHTML={{ __html: excerpt }} />
      <Link to={`/${slug}`}>
        <Button variant="primary">Voir l'article</Button>
      </Link>
    </Card.Body>
  </Card>
)
