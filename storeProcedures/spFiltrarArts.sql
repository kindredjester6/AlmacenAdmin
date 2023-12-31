USE [Warehouse]
GO
/****** Object:  StoredProcedure [dbo].[spFiltrarArticulos]    Script Date: 16/9/2023 06:12:58 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
-- =============================================
-- Author:		Oscar
-- Create date: 16/09/2023
-- Description:	<Description,,>
-- =============================================
ALTER PROCEDURE [dbo].[spFiltrarArticulos]
	-- Add the parameters for the stored procedure here
	@inInicialArt varchar(128)
	, @inCantidad int
	, @inClaseArt int
AS
BEGIN
	-- SET NOCOUNT ON added to prevent extra result sets from
	-- interfering with SELECT statements.
	SET NOCOUNT ON;

    -- Insert statements for procedure here
	if (@inInicialArt != '')
	begin
		select A.Codigo, A.Nombre, CA.Nombre as Clase, A.Precio from Articulo A inner join 
			ClaseArticulo CA
			on A.IdClaseArticulo = CA.id
		where @inClaseArt = A.IdClaseArticulo 
		and A.Nombre like ('%'+@inInicialArt+'%') 
		ORDER BY A.Nombre

		return;
	end
	else if (@inCantidad > 0)
	begin
		select TOP(@inCantidad)A.Codigo, A.Nombre, CA.Nombre as Clase, A.Precio from Articulo A inner join 
			ClaseArticulo CA
			on A.IdClaseArticulo = CA.id
		where @inClaseArt = A.IdClaseArticulo 
		ORDER BY A.Nombre

		return;
	end
	else if (@inClaseArt > 0)
	begin
		select A.Codigo, A.Nombre, CA.Nombre as Clase, A.Precio from Articulo A inner join 
			ClaseArticulo CA
			on A.IdClaseArticulo = CA.id
		where @inClaseArt = A.IdClaseArticulo
		ORDER BY A.Nombre

		return;
	end
END
